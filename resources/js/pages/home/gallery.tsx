import { useState } from "react";
import { Navbar } from "@/components/home/Navbar";
import { Head } from "@inertiajs/react";
import "../../../css/gallery.css";
import { Footer } from "@/components/home/Footer";

const images = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg", alt: "Mona Lisa", description: "Lukisan potret abad ke-16 yang dilukis dengan cat minyak oleh Leonardo da Vinci." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", alt: "The Starry Night", description: "Lukisan cat minyak di atas kanvas oleh seniman pasca-impresionis Belanda Vincent van Gogh." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", alt: "The Starry Night", description: "Lukisan cat minyak di atas kanvas oleh seniman pasca-impresionis Belanda Vincent van Gogh." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg", alt: "Mona Lisa", description: "Lukisan potret abad ke-16 yang dilukis dengan cat minyak oleh Leonardo da Vinci." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", alt: "The Starry Night", description: "Lukisan cat minyak di atas kanvas oleh seniman pasca-impresionis Belanda Vincent van Gogh." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", alt: "The Starry Night", description: "Lukisan cat minyak di atas kanvas oleh seniman pasca-impresionis Belanda Vincent van Gogh." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", alt: "The Starry Night", description: "Lukisan cat minyak di atas kanvas oleh seniman pasca-impresionis Belanda Vincent van Gogh." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg", alt: "Mona Lisa", description: "Lukisan potret abad ke-16 yang dilukis dengan cat minyak oleh Leonardo da Vinci." },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg", alt: "Mona Lisa", description: "Lukisan potret abad ke-16 yang dilukis dengan cat minyak oleh Leonardo da Vinci." },
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
            <div className="container mx-auto font-sans mt-5">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
                            onClick={() => openModal(image)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto block rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {image.alt}
                            </div>
                        </div>
                    ))}
                </div>

                {selectedImage && (
                    <div className="fixed inset-0 bg-white/50 backdrop-blur-md bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={closeModal}>
                        <div className="bg-white p-6 rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-xl" onClick={(e) => e.stopPropagation()}>
                            <span className="absolute top-3 right-4 text-gray-700 text-4xl cursor-pointer hover:text-red-600" onClick={closeModal}>&times;</span>
                            <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full h-auto block mx-auto mb-5 rounded-md" />
                            <h3 className="text-2xl font-semibold text-center mb-3 text-gray-800">{selectedImage.alt}</h3>
                            <p className="text-gray-700 text-justify leading-relaxed">{selectedImage.description}</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Gallery;
