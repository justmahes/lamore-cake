import { Head, useForm, usePage } from "@inertiajs/react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import FlashMessage from "@/components/flash-message";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormEvent, useRef, useState } from "react";

export default function ProfileEdit() {
  const { auth } = usePage().props as any;
  const user = auth?.user || {};

  const profileForm = useForm({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    postal_code: user.postal_code || "",
  });

  const passwordForm = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const deleteForm = useForm({
    password: "",
  });

  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const deletePasswordRef = useRef<HTMLInputElement>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    profileForm.patch(route("profile.update"), {
      preserveScroll: true,
    });
  };

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    passwordForm.put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => passwordForm.reset(),
      onError: (errors) => {
        if (errors.password) {
          passwordForm.reset("password", "password_confirmation");
          newPasswordRef.current?.focus();
        }
        if (errors.current_password) {
          passwordForm.reset("current_password");
          currentPasswordRef.current?.focus();
        }
      },
    });
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    deleteForm.reset();
    deleteForm.clearErrors();
  };

  const handleDeleteAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteForm.delete(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: closeDeleteDialog,
      onError: () => deletePasswordRef.current?.focus(),
      onFinish: () => deleteForm.reset("password"),
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
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={profileForm.data.name}
                  onChange={(event) => profileForm.setData("name", event.target.value)}
                  required
                />
                <InputError message={profileForm.errors.name} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileForm.data.email}
                  onChange={(event) => profileForm.setData("email", event.target.value)}
                  required
                />
                <InputError message={profileForm.errors.email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={profileForm.data.phone}
                  onChange={(event) => profileForm.setData("phone", event.target.value)}
                  required
                />
                <InputError message={profileForm.errors.phone} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  value={profileForm.data.address}
                  onChange={(event) => profileForm.setData("address", event.target.value)}
                  required
                />
                <InputError message={profileForm.errors.address} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="postal_code">Kode Pos</Label>
                <Input
                  id="postal_code"
                  value={profileForm.data.postal_code}
                  onChange={(event) => profileForm.setData("postal_code", event.target.value)}
                />
                <InputError message={profileForm.errors.postal_code} />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={profileForm.processing}>
                  Simpan Profil
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Ubah Kata Sandi</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current_password">Kata Sandi Saat Ini</Label>
                <Input
                  id="current_password"
                  type="password"
                  ref={currentPasswordRef}
                  value={passwordForm.data.current_password}
                  onChange={(event) => passwordForm.setData("current_password", event.target.value)}
                  autoComplete="current-password"
                  required
                />
                <InputError message={passwordForm.errors.current_password} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Kata Sandi Baru</Label>
                <Input
                  id="password"
                  type="password"
                  ref={newPasswordRef}
                  value={passwordForm.data.password}
                  onChange={(event) => passwordForm.setData("password", event.target.value)}
                  autoComplete="new-password"
                  required
                />
                <InputError message={passwordForm.errors.password} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Konfirmasi Kata Sandi</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  value={passwordForm.data.password_confirmation}
                  onChange={(event) => passwordForm.setData("password_confirmation", event.target.value)}
                  autoComplete="new-password"
                  required
                />
                <InputError message={passwordForm.errors.password_confirmation} />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={passwordForm.processing}>
                  Simpan Kata Sandi
                </Button>
              </div>

              {passwordForm.recentlySuccessful && (
                <p className="text-sm text-green-600">Kata sandi berhasil diperbarui.</p>
              )}
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg border border-red-200">
          <CardHeader>
            <CardTitle>Hapus Akun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Menghapus akun akan menghapus seluruh data pribadi yang terkait dengan profil Anda. Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
            </p>
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-200">
              <p className="font-semibold">Peringatan</p>
              <p>Pastikan Anda telah menyelesaikan seluruh pesanan aktif sebelum melanjutkan.</p>
            </div>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
              Hapus Akun Saya
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => (open ? setIsDeleteDialogOpen(true) : closeDeleteDialog())}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Penghapusan Akun</DialogTitle>
            <DialogDescription>
              Setelah akun dihapus, seluruh data Anda akan hilang secara permanen. Masukkan kata sandi untuk melanjutkan proses penghapusan.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDeleteAccount} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="delete_password">Kata Sandi</Label>
              <Input
                id="delete_password"
                type="password"
                ref={deletePasswordRef}
                value={deleteForm.data.password}
                onChange={(event) => deleteForm.setData("password", event.target.value)}
                autoComplete="current-password"
                required
              />
              <InputError message={deleteForm.errors.password} />
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="secondary" onClick={closeDeleteDialog}>
                Batal
              </Button>
              <Button type="submit" variant="destructive" disabled={deleteForm.processing}>
                Hapus Akun Permanen
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
