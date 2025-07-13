import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Orders",
        href: "/admin/orders",
    },
];

export default function AdminOrders() {
    const { orders } = usePage().props as any;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Orders" />
            <div className="container mx-auto space-y-6 p-4">
            <h1 className="text-2xl font-bold">Orders</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Order List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((o: any) => (
                                <TableRow key={o.id}>
                                    <TableCell>
                                        <a className="text-primary" href={`/admin/orders/${o.id}`}>{o.id}</a>
                                    </TableCell>
                                    <TableCell>{o.user.name}</TableCell>
                                    <TableCell>{o.total_price}</TableCell>
                                    <TableCell>{o.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            </div>
        </AppLayout>
    );
}
