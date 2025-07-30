import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePage } from "@inertiajs/react";

export default function FlashMessage() {
    const { flash } = usePage().props as any;
    if (!flash || !flash.success) return null;
    return (
        <div className="p-4">
            <Alert>
                <AlertDescription>{flash.success}</AlertDescription>
            </Alert>
        </div>
    );
}
