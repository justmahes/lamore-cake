import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const slides = [
  { src: "/assets/home/1.jpg", title: "Signature Bolu Bali", desc: "Lembut, wangi, dan autentik." },
  { src: "/assets/home/2.jpg", title: "Pudding Tape", desc: "Manis seimbang, favorit keluarga." },
  { src: "/assets/home/3.jpg", title: "Hampers Spesial", desc: "Hadiah hangat untuk momen penting." },
];

export function Featured() {
  return (
    <section className="container mx-auto px-4 py-10 sm:py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Menu Unggulan</h2>
          <p className="text-muted-foreground">Geser untuk melihat pilihan terbaik kami</p>
        </div>
        <a href="/products">
          <Button variant="outline">Lihat Semua Produk</Button>
        </a>
      </div>

      <div className="relative">
        <Carousel className="w-full" opts={{ align: "start" }}>
          <CarouselContent>
            {slides.map((s) => (
              <CarouselItem key={s.src} className="md:basis-1/2 lg:basis-1/3">
                <div className="group overflow-hidden rounded-lg border bg-card shadow">
                  <img src={s.src} alt={s.title} className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <h3 className="font-semibold leading-tight">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                    <a href="/products">
                      <Button size="sm">Beli</Button>
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 md:-left-12" />
          <CarouselNext className="right-3 top-1/2 -translate-y-1/2 md:-right-12" />
        </Carousel>
      </div>
    </section>
  );
}
