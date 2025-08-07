import { Button } from "./ui/button";

export const Cta = () => {
  return (
    <section
      id="cta"
      className="bg-muted/50 py-16 my-24 sm:my-32"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Rasakan Kelezatan
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Kue Premium{" "}
            </span>
            Hari Ini Juga
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            Jangan tunggu lagi! Pesan sekarang dan nikmati cita rasa otentik kue-kue 
            berkualitas tinggi yang dibuat dengan cinta dan resep tradisional terbaik.
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto" asChild>
            <a href="/products">Lihat Produk</a>
          </Button>
          <Button
            variant="outline"
            className="w-full md:w-auto"
            asChild
          >
            <a href="/cart">Keranjang Saya</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
