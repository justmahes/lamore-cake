/**
 * Halaman ini ditampilkan ketika pembayaran pengguna tertunda (pending).
 * Ini terjadi jika pengguna menutup popup pembayaran sebelum menyelesaikan transaksi
 * atau jika pembayaran memerlukan waktu untuk diproses (misalnya, transfer bank).
 * Fitur utama:
 * - Menampilkan pesan yang jelas bahwa pembayaran tertunda.
 * - Memberikan tombol aksi kepada pengguna untuk:
 *   - Melihat riwayat pesanan mereka.
 *   - Kembali berbelanja.
 */
import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

export default function PaymentPending() {
  return (
    <>
      <Navbar />
      <Head title="Pembayaran Tertunda" />
      <div className="container mx-auto max-w-2xl space-y-6 p-4">
        {/* SECTION: Kartu informasi status pembayaran tertunda */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
              <Clock className="h-10 w-10 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-yellow-700">
              Pembayaran Tertunda
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-gray-600">
              Anda belum menyelesaikan pembayaran. Segera lakukan pembayaran agar pesanan diproses.
            </p>
            {/* SECTION: Tombol aksi untuk pengguna */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href="/transactions">Lihat Riwayat Pesanan</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">Belanja Lagi</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}