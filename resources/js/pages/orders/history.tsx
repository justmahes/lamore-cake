import { Head, usePage } from '@inertiajs/react';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import FlashMessage from '@/components/flash-message';
import { useEffect, useMemo, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

function Countdown({ expireAt }: { expireAt: number }) {
  const [remain, setRemain] = useState<number>(Math.max(0, expireAt - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setRemain(Math.max(0, expireAt - Date.now())), 1000);
    return () => clearInterval(id);
  }, [expireAt]);
  const mm = String(Math.floor(remain / 60000)).padStart(2, '0');
  const ss = String(Math.floor((remain % 60000) / 1000)).padStart(2, '0');
  return <span>{mm}:{ss}</span>;
}

export default function OrderHistory() {
  const { orders, pending_payments } = usePage().props as any;
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
        expires_at: (o as any).expires_at,
        total: o.total_price ?? sum,
        items,
        resume_url: (o as any).resume_url,
      };
    });
  }, [orders]);

  const orderIndexMap = useMemo(() => {
    const sorted = [...list].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const map = new Map<number, number>();
    sorted.forEach((o: any, i: number) => map.set(o.id, i + 1));
    return map;
  }, [list]);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return list.filter((o: any) =>
      String(o.id).includes(ql) ||
      (o.status && o.status.toLowerCase().includes(ql)) ||
      o.items.some((it: any) => it.name.toLowerCase().includes(ql))
    );
  }, [list, q]);

  const idr = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
  const statusLabel = (s?: string) => {
    switch (s) {
      case 'pending': return 'Pending';
      case 'paid': return 'Pembayaran Berhasil';
      case 'processing': return 'Di Proses';
      case 'shipped': return 'Dikirim';
      case 'delivered': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      case 'failed': return 'Pembayaran gagal';
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

        {Array.isArray(pending_payments) && pending_payments.length > 0 && (
          <Card className="border border-yellow-300 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-sm">Anda belum menyelesaikan pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              {pending_payments.map((p: any, idx: number) => (
                <div key={p.order_id || idx} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    Order: <span className="font-mono">{p.order_id}</span>
                    <span className="mx-2">•</span>
                    Total: <span className="font-semibold">Rp{Number(p.total_amount || 0).toLocaleString()}</span>
                  </div>
                  <a href={p.redirect_url} className="underline text-primary">Lanjutkan Pembayaran</a>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

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
                  <CardTitle className="text-base">Pesanan #{orderIndexMap.get(o.id) ?? o.id}</CardTitle>
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
                    o.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    o.status === 'unpaid' ? 'bg-orange-100 text-orange-800' :
                    o.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-accent'
                  }`}>{statusLabel(o.status)}</span>
                  <div className="text-right text-sm font-semibold">{idr.format(Number(o.total || 0))}</div>
                </div>
              </CardHeader>
              <CardContent>
                <Collapsible>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Detail item</div>
                    <div className="flex items-center gap-3">
                      {o.status === 'pending' && o.resume_url && (
                        <>
                          <span className="text-xs text-muted-foreground">Anda belum menyelesaikan pembayaran • Sisa waktu <Countdown expireAt={o.expires_at ? new Date(o.expires_at).getTime() : (new Date(o.date).getTime() + 5 * 60 * 1000)} /></span>
                          <a href={o.resume_url} className="text-sm font-medium text-primary underline underline-offset-4">Selesaikan Pembayaran</a>
                        </>
                      )}
                      <CollapsibleTrigger className="text-sm font-medium text-primary underline-offset-4 hover:underline">Lihat</CollapsibleTrigger>
                    </div>
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
                              <TableCell className="text-right">{idr.format(Number(it.price || 0))}</TableCell>
                              <TableCell className="text-right font-medium">{idr.format(Number(it.total || 0))}</TableCell>
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
