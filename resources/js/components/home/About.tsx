import { Statistics } from "./Statistics";

export const About = () => {
    return (
        <section
            id="about"
            className="container py-24 sm:py-32"
        >
            <div className="bg-muted/50 border rounded-lg py-12">
                <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
                    <img
                        src="https://placehold.co/300x200?text=Cake"
                        alt=""
                        className="w-[300px] object-contain rounded-lg"
                    />
                    <div className="bg-green-0 flex flex-col justify-between">
                        <div className="pb-6">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                                    About{" "}
                                </span>
                                Lamore Cake
                            </h2>
                            <p className="text-xl text-muted-foreground mt-4">
                                Lamore Cake, didirikan di Denpasar, Bali pada tahun 2024, adalah UMKM kuliner yang fokus menyajikan jajanan tradisional Bali homemade. Kami menawarkan beragam pilihan seperti pudding tape, hampers, dan kue bolu Bali, semua dibuat dengan bahan segar berkualitas. Lebih dari sekadar toko, Lamore Cake adalah tempat hangat untuk menikmati cita rasa autentik dan mempererat ikatan komunitas.
                            </p>
                        </div>

                        <Statistics />
                    </div>
                </div>
            </div>
        </section>
    );
};
