import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage, router } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Products",
        href: "/products",
    },
];

export default function Products() {
    const { products, categories, selectedCategory } = usePage().props as any;
    const { post } = useForm({});

    const handleCategoryFilter = (category: string) => {
        router.get('/products', { category }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="container mx-auto p-4">
                <h1 className="mb-4 text-2xl font-bold">Products</h1>
                
                {/* Category Filter Tabs */}
                {categories && categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 border-b mb-4">
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
                            <a href={`/products/${p.id}`}>
                                <img src={p.image} alt={p.name} className="mb-2 h-40 w-full object-cover" />
                                <h2 className="font-semibold">{p.name}</h2>
                                {p.category && (
                                    <span className="text-sm text-gray-500 capitalize">
                                        {p.category}
                                    </span>
                                )}
                            </a>
                            <p className="font-bold">Rp {p.price}</p>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    post(`/cart/add/${p.id}`);
                                }}
                                className="mt-2"
                            >
                                <button type="submit" className="rounded bg-primary px-3 py-1 text-white">
                                    Add to Cart
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
