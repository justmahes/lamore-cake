import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Sales Report",
        href: "/admin/reports/sales",
    },
];

export default function SalesReport() {
    const { sales, bestSellers } = usePage().props as any;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales Report" />
            <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sales Report</h1>
            <h2 className="font-semibold mb-2">Best Sellers</h2>
            <ul>
                {bestSellers.map((b: any) => (
                    <li key={b.product_id}>{b.product.name} ({b.qty})</li>
                ))}
            </ul>
            </div>
        </AppLayout>
    );
}
