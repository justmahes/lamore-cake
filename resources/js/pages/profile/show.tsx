import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FlashMessage from "@/components/flash-message";
import { Head, usePage } from "@inertiajs/react";

export default function ProfileShow() {
  const { auth } = usePage().props as any;
  const user = auth?.user || {};
  return (
    <>
      <Navbar />
      <Head title="Profil" />
      <FlashMessage />
      <div className="container mx-auto max-w-3xl space-y-6 p-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Profil</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="text-sm text-muted-foreground">Nama</div>
              <div className="font-medium">{user.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{user.email}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Telepon</div>
              <div className="font-medium">{user.phone ?? '-'}</div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-sm text-muted-foreground">Alamat</div>
              <div className="font-medium">{user.address ?? '-'}</div>
              {user.postal_code && <div className="text-sm text-muted-foreground">Kode Pos: {user.postal_code}</div>}
            </div>
            <div className="sm:col-span-2">
              <a href="/profile/edit" className="text-primary underline-offset-4 hover:underline">Ubah profil</a>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
