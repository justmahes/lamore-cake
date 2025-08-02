import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import FlashMessage from "@/components/flash-message";
import { Head, usePage, router } from "@inertiajs/react";

export default function GuestProducts() {
    const { products, auth, categories, selectedCategory } = usePage().props as any;
    
    const handleCategoryFilter = (category: string) => {
        router.get('/products', { category }, { preserveState: true });
    };

    return (
        <>
            <Head title="Products" />
            <Navbar />
            <FlashMessage />
            <div className="container mx-auto space-y-4 p-4">
                <h1 className="text-2xl font-bold">Products</h1>
                
                {/* Category Filter Tabs */}
                {categories && categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 border-b">
                        <button
                            onClick={() => handleCategoryFilter('all')}
                            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                                selectedCategory === 'all'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            All
                        </button>
                        {categories.map((category: string) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryFilter(category)}
                                className={`px-4 py-2 font-medium border-b-2 transition-colors capitalize ${
                                    selectedCategory === category
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-3">
                    {products.map((p: any) => (
                        <div key={p.id} className="rounded border p-4">
                            <a href={auth.user ? `/products/${p.id}` : `/guest/products/${p.id}`}>
                                <img src={p.image} alt={p.name} className="mb-2 h-40 w-full object-cover" />
                                <h2 className="font-semibold">{p.name}</h2>
                                {p.category && (
                                    <span className="text-sm text-gray-500 capitalize">
                                        {p.category}
                                    </span>
                                )}
                            </a>
                            <p className="font-bold">Rp {p.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
