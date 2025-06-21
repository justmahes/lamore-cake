import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Head } from "@inertiajs/react";

const teamMembers: any = [
    {
        name: 'Bjir',
        title: 'Chief Executive Officer',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bio: 'Ia adalah visioner di balik perusahaan ini, memimpin dengan inovasi dan dedikasi untuk mencapai tujuan kami.',
    },
    {
        name: 'Bjar',
        title: 'Chief Technology Officer',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bio: 'Ia memimpin pengembangan teknologi kami, memastikan kami tetap di garis depan inovasi digital.',
    },
    {
        name: 'Bjor',
        title: 'Head of Marketing',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bio: 'Ia bertanggung jawab atas strategi pemasaran yang efektif, menghubungkan kami dengan audiens global.',
    },
];

const AboutUs = () => {
    return (
        <>
            <Head title="About Us" />
            <Navbar />
            <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4cd085?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
                            Tentang Kami
                        </h1>
                        <p className="text-lg sm:text-xl opacity-90 mb-8 animate-fade-in-up">
                            Misi kami adalah memberikan solusi inovatif yang membentuk masa depan.
                        </p>
                        <a
                            href="#our-story"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-blue-600 bg-white hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                        >
                            Pelajari Lebih Lanjut
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </section>

                {/* Our Story Section */}
                <section id="our-story" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:space-x-12">
                        <div className="lg:w-1/2 mb-8 lg:mb-0">
                            <img
                                src="https://s39613.pcdn.co/wp-content/uploads/2019/06/rights-and-responsibilities-for-group-members-062819-2.jpg"
                                alt="Our Story"
                                className="rounded-lg shadow-xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">Kisah Kami</h2>
                            <p className="text-lg leading-relaxed mb-4 text-gray-700">
                                Didirikan pada tahun 20XX, perusahaan kami bermula dari sebuah ide sederhana: bagaimana teknologi dapat memecahkan masalah kompleks dan menciptakan dampak positif bagi masyarakat. Dengan semangat inovasi dan komitmen terhadap kualitas, kami telah tumbuh menjadi pemimpin di industri ini.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Kami percaya pada kekuatan kolaborasi, keberlanjutan, dan pengejaran keunggulan tanpa henti. Setiap langkah yang kami ambil didorong oleh keinginan untuk melampaui harapan dan memberikan nilai nyata.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision Section */}
                <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center mb-4">
                                <svg className="w-10 h-10 text-blue-600 mr-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l1.293 1.293a1 1 0 001.414 0L12.414 15H15a2 2 0 002-2V5a2 2 0 00-2-2H3zm7 5a1 1 0 00-1 1v3a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                </svg>
                                <h3 className="text-2xl font-bold text-gray-900">Misi Kami</h3>
                            </div>
                            <p className="text-lg text-gray-700">
                                Menjadi pelopor dalam menciptakan solusi teknologi yang memberdayakan individu dan bisnis, mendorong pertumbuhan berkelanjutan, dan meningkatkan kualitas hidup secara global.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center mb-4">
                                <svg className="w-10 h-10 text-green-600 mr-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                                </svg>
                                <h3 className="text-2xl font-bold text-gray-900">Visi Kami</h3>
                            </div>
                            <p className="text-lg text-gray-700">
                                Untuk membangun ekosistem digital yang inklusif dan inovatif, di mana setiap orang memiliki akses ke alat dan pengetahuan untuk mencapai potensi penuh mereka.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Team Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900">Tim Kami yang Hebat</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {teamMembers.map((member: any) => (
                                <div key={member.id} className="bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-white shadow-md"
                                    />
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{member.name}</h3>
                                    <p className="text-blue-600 font-medium mb-4">{member.title}</p>
                                    <p className="text-gray-700 text-center text-sm">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="bg-black py-16 px-4 sm:px-6 lg:px-8 text-white text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ingin Bergabung dengan Kami?</h2>
                        <p className="text-lg sm:text-xl opacity-90 mb-8">
                            Kami selalu mencari individu berbakat yang berbagi visi dan nilai-nilai kami. Mari tumbuh bersama!
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-black bg-white hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                        >
                            Hubungi Kami
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
