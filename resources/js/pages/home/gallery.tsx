import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import "../../../css/gallery.css";

const images = [
    {
        src: "/assets/gallery/1.jpg",
        alt: "Pudding Tape",
        description: "Pudding Tape lembut dengan aroma tape manis khas Bali.",
    },
    {
        src: "/assets/gallery/2.jpg",
        alt: "Kue Bolu Bali",
        description: "Kue bolu tradisional dengan cita rasa lokal.",
    },
    {
        src: "/assets/gallery/3.jpg",
        alt: "Pia Susu",
        description: "Pia susu dengan kulit tipis dan isian manis legit.",
    },
    {
        src: "/assets/gallery/4.jpg",
        alt: "Dadar Gulung",
        description: "Pancake hijau berisi kelapa parut gula merah.",
    },
    {
        src: "/assets/gallery/5.jpg",
        alt: "Lapis Legit",
        description: "Kue lapis legit dengan aroma rempah.",
    },
    {
        src: "/assets/gallery/6.jpg",
        alt: "Lamore Cake",
        description: "Bola ketan isi gula merah disajikan dengan kelapa parut.",
    },
];

const Gallery = () => {
    const [selectedImage, setSelectedImage]: any = useState(null);

    const openModal = (image: any) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <Head title="Gallery" />
            <Navbar />
            <div className="container mx-auto p-5 font-sans">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform duration-200 hover:scale-[1.01]"
                            onClick={() => openModal(image)}
                        >
                            <img src={image.src} alt={image.alt} className="block h-full w-full rounded-lg object-cover" />
                            <div className="bg-opacity-60 absolute right-0 bottom-0 left-0 bg-black p-2 text-center text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {image.alt}
                            </div>
                        </div>
                    ))}
                </div>

                {selectedImage && (
                    <div
                        className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-white/50 p-4 backdrop-blur-md"
                        onClick={closeModal}
                    >
                        <div
                            className="relative max-h-[90vh] max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="absolute top-3 right-4 cursor-pointer text-4xl text-gray-700 hover:text-red-600" onClick={closeModal}>
                                &times;
                            </span>
                            <img src={selectedImage.src} alt={selectedImage.alt} className="mx-auto mb-5 block h-auto max-w-full rounded-md" />
                            <h3 className="mb-3 text-center text-2xl font-semibold text-gray-800">{selectedImage.alt}</h3>
                            <p className="text-justify leading-relaxed text-gray-700">{selectedImage.description}</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Gallery;
