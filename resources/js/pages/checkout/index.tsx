import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type BreadcrumbItem } from '@/types';
import FlashMessage from '@/components/flash-message';
import { useEffect, useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Checkout",
        href: "/checkout",
    },
];

export default function Checkout() {
    const { auth } = usePage().props as any;
    const user = auth?.user || {};

    // Coba ekstrak area dari alamat tersimpan: "Denpasar {Area}, ..."
    const savedArea = (() => {
        const addr: string = user.address || '';
        const m = addr.match(/Denpasar\s+(Utara|Timur|Barat|Selatan)/i);
        if (!m) return '';
        const a = m[1].toLowerCase();
        if (a === 'utara') return 'Utara';
        if (a === 'timur') return 'Timur';
        if (a === 'barat') return 'Barat';
        if (a === 'selatan') return 'Selatan';
        return '';
    })();

    // Normalisasi alamat tersimpan menjadi hanya address_line tanpa prefix area/kode pos
    const savedAddressLine = (() => {
        let addr: string = user.address || '';
        if (!addr) return '';
        addr = addr.replace(/^\s*Denpasar\s+(Utara|Timur|Barat|Selatan)\s*,\s*/i, '');
        // hapus kode pos numerik 5 digit di akhir (jika ada)
        addr = addr.replace(/\s*(\d{5})\s*$/, '');
        return addr.trim();
    })();

    const savedPostal = (() => {
        if (user.postal_code) return String(user.postal_code);
        const addr: string = user.address || '';
        const m = addr.match(/(\d{5})\s*$/);
        return m ? m[1] : '';
    })();

    const form = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        area: savedArea,
        postal_code: savedPostal,
        address_line: savedAddressLine,
    });

    const fetchPostal = async (area: string) => {
        form.setData('area', area);
        try {
            // Example: adjust to your available API endpoint
            const res = await fetch(`/api/postal-code?city=denpasar&area=${encodeURIComponent(area)}`);
            if (res.ok) {
                const data = await res.json();
                if (data?.postal_code) form.setData('postal_code', String(data.postal_code));
            }
        } catch (_) {
            // fallback: keep current postal_code (user can edit later in profile page if needed)
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/checkout');
    };

    // Local popup for validation error
    const [showErrorToast, setShowErrorToast] = useState(false);
    const hasErrors = useMemo(() => Object.keys(form.errors).length > 0, [form.errors]);
    useEffect(() => {
        if (hasErrors) {
            setShowErrorToast(true);
            const t = setTimeout(() => setShowErrorToast(false), 6000);
            return () => clearTimeout(t);
        }
    }, [hasErrors]);

    return (
        <>
            <Navbar />
            <Head title="Checkout" />
            <FlashMessage />
            <div className="container mx-auto max-w-2xl space-y-6 p-4">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Checkout</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-2 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input id="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                                    <InputError message={form.errors.name} />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
                                    <InputError message={form.errors.email} />
                                </div>
                            </div>

                            <div className="grid gap-2 sm:grid-cols-3">
                                <div>
                                    <Label>Area (Denpasar)</Label>
                                    <Select value={form.data.area} onValueChange={(v) => fetchPostal(v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih area" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Utara">Denpasar Utara</SelectItem>
                                            <SelectItem value="Timur">Denpasar Timur</SelectItem>
                                            <SelectItem value="Barat">Denpasar Barat</SelectItem>
                                            <SelectItem value="Selatan">Denpasar Selatan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={form.errors.area} />
                                </div>
                                <div>
                                    <Label htmlFor="postal">Kode Pos</Label>
                                    <Input id="postal" value={form.data.postal_code} onChange={(e) => form.setData('postal_code', e.target.value)} />
                                    <p className="text-xs text-muted-foreground">Otomatis berdasarkan area, bisa disesuaikan.</p>
                                </div>
                                <div>
                                    <Label htmlFor="phone">No. Telepon</Label>
                                    <Input id="phone" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} />
                                    <InputError message={form.errors.phone} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address">Alamat Lengkap</Label>
                                <Input id="address" value={form.data.address_line} onChange={(e) => form.setData('address_line', e.target.value)} />
                                <InputError message={form.errors.address_line || form.errors.address} />
                            </div>

                            <Button type="submit" className="w-full sm:w-auto">Lanjutkan Pembayaran</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            {showErrorToast && (
                <div className="fixed top-4 right-4 z-50 w-[min(92vw,28rem)] rounded-md bg-red-600 text-white shadow-lg ring-1 ring-black/10">
                    <div className="flex items-start gap-3 px-4 py-3">
                        <div className="flex-1">
                            <div className="text-sm font-semibold">Data belum lengkap</div>
                            <div className="text-sm leading-5">Lengkapi data pengiriman sebelum melanjutkan pembayaran.</div>
                        </div>
                        <button
                            type="button"
                            aria-label="Tutup notifikasi"
                            className="opacity-85 hover:opacity-100 transition-opacity"
                            onClick={() => setShowErrorToast(false)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
