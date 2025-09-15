import { Head, usePage } from '@inertiajs/react';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import FlashMessage from '@/components/flash-message';
import { useMemo, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function OrderHistory() {
  const { orders } = usePage().props as any;
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    return (orders || []).map((o: any) => {
      const items = (o.items || []).map((it: any) => ({
        name: it.product?.name ?? '-',
        qty: it.quantity,
        price: it.price,
        total: (it.price || 0) * (it.quantity || 0),
      }));
      const sum = items.reduce((acc: number, x: any) => acc + (x.total || 0), 0);
      return {
        id: o.id,
        status: o.status,
        date: o.created_at,
        total: o.total_price ?? sum,
        items,
      };
    });
  }, [orders]);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return list.filter((o: any) =>
      String(o.id).includes(ql) ||
      (o.status && o.status.toLowerCase().includes(ql)) ||
      o.items.some((it: any) => it.name.toLowerCase().includes(ql))
    );
  }, [list, q]);

  const statusLabel = (s?: string) => {
    switch (s) {
      case 'pending': return 'Pending';
      case 'paid': return 'Konfirmasi';
      case 'processing': return 'Di Proses';
      case 'shipped': return 'Dikirim';
      case 'delivered': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      default: return s || '-';
    }
  };

  return (
    <>
      <Navbar />
      <Head title="Riwayat Pesanan" />
      <FlashMessage />
      <div className="container mx-auto max-w-6xl space-y-4 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl font-bold">Riwayat Pesanan Anda</h1>
          <div className="sm:min-w-[320px]">
            <Input placeholder="Cari berdasarkan produk..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>

        <div className="text-sm text-muted-foreground">{filtered.length} pesanan ditemukan</div>

        {filtered.length === 0 && (
          <Card className="shadow-lg border">
            <CardContent className="p-6 text-center text-sm text-muted-foreground">Tidak ada pesanan.</CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {filtered.map((o: any) => (
            <Card key={o.id} className="shadow-lg border">
              <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-base">Pesanan #{o.id}</CardTitle>
                  <div className="text-xs text-muted-foreground">
                    {(() => { try { const dt = new Date(o.date); if (isNaN(dt.getTime())) return '-'; return dt.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short', hour12: false }); } catch { return '-'; } })()}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded px-2 py-1 text-xs font-medium ${
                    o.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    o.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                    o.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                    o.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                    o.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    o.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-accent'
                  }`}>{statusLabel(o.status)}</span>
                  <div className="text-right text-sm font-semibold">Rp{o.total?.toLocaleString()}</div>
                </div>
              </CardHeader>
              <CardContent>
                <Collapsible>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Detail item</div>
                    <CollapsibleTrigger className="text-sm font-medium text-primary underline-offset-4 hover:underline">Lihat</CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <div className="mt-3 overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produk</TableHead>
                            <TableHead className="text-center">Jumlah</TableHead>
                            <TableHead className="text-right">Harga</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {o.items.map((it: any, idx: number) => (
                            <TableRow key={idx}>
                              <TableCell>{it.name}</TableCell>
                              <TableCell className="text-center">{it.qty}</TableCell>
                              <TableCell className="text-right">Rp{(it.price || 0).toLocaleString()}</TableCell>
                              <TableCell className="text-right font-medium">Rp{(it.total || 0).toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
