import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import FlashMessage from "@/components/flash-message";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function ProfileEdit() {
  const { auth } = usePage().props as any;
  const user = auth?.user || {};
  const form = useForm({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    postal_code: user.postal_code || "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.patch(route("profile.update"), {
      preserveScroll: true,
    });
  };

  return (
    <>
      <Navbar />
      <Head title="Ubah Profil" />
      <FlashMessage />
      <div className="container mx-auto max-w-3xl space-y-6 p-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Ubah Profil</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama</Label>
                <Input id="name" value={form.data.name} onChange={(e) => form.setData("name", e.target.value)} />
                <InputError message={form.errors.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.data.email} onChange={(e) => form.setData("email", e.target.value)} />
                <InputError message={form.errors.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" value={form.data.phone} onChange={(e) => form.setData("phone", e.target.value)} />
                <InputError message={form.errors.phone} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Alamat</Label>
                <Input id="address" value={form.data.address} onChange={(e) => form.setData("address", e.target.value)} />
                <InputError message={form.errors.address} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="postal">Kode Pos</Label>
                <Input id="postal" value={form.data.postal_code} onChange={(e) => form.setData("postal_code", e.target.value)} />
                <InputError message={form.errors.postal_code} />
              </div>
              <div className="pt-2">
                <Button type="submit">Simpan</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}

