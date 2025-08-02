import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePage } from "@inertiajs/react";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

export default function FlashMessage() {
    const { flash } = usePage().props as any;
    
    if (!flash) return null;

    const renderAlert = (type: string, message: string, variant: "default" | "destructive" = "default") => {
        const icons = {
            success: <CheckCircle className="h-4 w-4 text-green-600" />,
            error: <XCircle className="h-4 w-4 text-red-600" />,
            warning: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
            info: <Info className="h-4 w-4 text-blue-600" />
        };

        const styles = {
            success: "border-green-200 bg-green-50 text-green-800",
            error: "border-red-200 bg-red-50 text-red-800",
            warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
            info: "border-blue-200 bg-blue-50 text-blue-800"
        };

        return (
            <div className="p-4">
                <Alert className={styles[type as keyof typeof styles]} variant={variant}>
                    {icons[type as keyof typeof icons]}
                    <AlertDescription className="ml-2">{message}</AlertDescription>
                </Alert>
            </div>
        );
    };

    return (
        <>
            {flash.success && renderAlert('success', flash.success)}
            {flash.error && renderAlert('error', flash.error, 'destructive')}
            {flash.warning && renderAlert('warning', flash.warning)}
            {flash.info && renderAlert('info', flash.info)}
        </>
    );
}
