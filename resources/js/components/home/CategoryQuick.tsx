import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function CategoryQuick() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Jelajah Cepat</h2>
        <a href="/products"><Button variant="link">Lihat semua</Button></a>
      </div>
      <Tabs defaultValue="terlaris" className="w-full">
        <div className="overflow-x-auto">
        <TabsList className="min-w-max gap-1">
          <TabsTrigger value="terlaris">Terlaris</TabsTrigger>
          <TabsTrigger value="signature">Signature</TabsTrigger>
          <TabsTrigger value="baru">Baru</TabsTrigger>
        </TabsList>
        </div>
        <TabsContent value="terlaris" className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map((i) => (
              <a key={i} href="/products" className="group rounded-lg border bg-card p-4 shadow hover:shadow-md">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-md">
                  <img src={`/assets/home/${((i-1)%3)+1}.jpg`} alt="Kategori" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="mt-3 font-medium">Favorit Pelanggan #{i}</div>
                <div className="text-sm text-muted-foreground">Lihat lebih banyak</div>
              </a>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="signature" className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map((i) => (
              <a key={i} href="/products" className="group rounded-lg border bg-card p-4 shadow hover:shadow-md">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-md">
                  <img src={`/assets/home/${((i-1)%3)+1}.jpg`} alt="Signature" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="mt-3 font-medium">Signature #{i}</div>
                <div className="text-sm text-muted-foreground">Cicipi pilihan ikonik kami</div>
              </a>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="baru" className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map((i) => (
              <a key={i} href="/products" className="group rounded-lg border bg-card p-4 shadow hover:shadow-md">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-md">
                  <img src={`/assets/home/${((i-1)%3)+1}.jpg`} alt="Baru" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="mt-3 font-medium">Menu Baru #{i}</div>
                <div className="text-sm text-muted-foreground">Jangan lewatkan edisi terbaru</div>
              </a>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
