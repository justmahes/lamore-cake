import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import type React from "react";

interface Props {
    src: string;
    alt?: string;
    className?: string;
}

export default function ImagePreview({ src, alt, className }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <img src={src} alt={alt} className={"cursor-pointer " + (className ?? "")} />
            </DialogTrigger>
            <DialogContent className="p-0">
                <img src={src} alt={alt} className="max-h-[80vh] w-full object-contain" />
            </DialogContent>
        </Dialog>
    );
}
