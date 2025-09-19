import { useEffect, useMemo, useState } from "react";
import type { JSX } from "react";
import { usePage } from "@inertiajs/react";
import { CheckCircle, XCircle, AlertTriangle, Info, X as CloseIcon } from "lucide-react";

type MsgType = "success" | "error" | "warning" | "info";

type Msg = {
  id: string;
  type: MsgType;
  text: string;
  duration?: number;
};

type ToastEventDetail = {
  id?: string;
  type: MsgType;
  text: string;
  duration?: number;
  replace?: boolean;
};

export default function FlashMessage() {
  const { flash } = usePage().props as any;

  const incoming: Msg[] = useMemo(() => {
    const list: Msg[] = [];
    if (!flash) return list;
    if (flash.success) list.push({ id: `success-${Date.now()}`, type: "success", text: String(flash.success) });
    if (flash.error) list.push({ id: `error-${Date.now()}`, type: "error", text: String(flash.error) });
    if (flash.warning) list.push({ id: `warning-${Date.now()}`, type: "warning", text: String(flash.warning) });
    if (flash.info) list.push({ id: `info-${Date.now()}`, type: "info", text: String(flash.info) });
    return list;
  }, [flash]);

  const [messages, setMessages] = useState<Msg[]>([]);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<ToastEventDetail>;
      const detail = customEvent.detail;
      if (!detail || !detail.type || !detail.text) return;
      setMessages((prev) => {
        const id = detail.id ?? `${detail.type}-${Date.now()}`;
        const base = detail.replace ? [] : prev;
        const filtered = base.filter((x) => x.id !== id);
        return [...filtered, { id, type: detail.type, text: detail.text, duration: detail.duration }];
      });
    };

    window.addEventListener("app:toast", handler);

    return () => {
      window.removeEventListener("app:toast", handler);
    };
  }, []);

  useEffect(() => {
    if (incoming.length) {
      // Replace with the latest flash set
      setMessages(incoming);
    }
  }, [incoming]);

  useEffect(() => {
    // Auto dismiss with different durations
    const timers = messages.map((m) => {
      const duration = m.duration ?? (m.type === "error" ? 6000 : 4000);
      return setTimeout(() => {
        setMessages((prev) => prev.filter((x) => x.id !== m.id));
      }, duration);
    });
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [messages]);

  if (!messages.length) return null;

  const styles: Record<MsgType, string> = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-600 text-white",
  };

  const icons: Record<MsgType, JSX.Element> = {
    success: <CheckCircle className="size-5" />,
    error: <XCircle className="size-5" />,
    warning: <AlertTriangle className="size-5" />,
    info: <Info className="size-5" />,
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex max-w-full flex-col gap-2">
      {messages.map((m) => (
        <div
          key={m.id}
          role={m.type === "error" ? "alert" : "status"}
          aria-live={m.type === "error" ? "assertive" : "polite"}
          className={`${styles[m.type]} shadow-lg ring-1 ring-black/10 rounded-md px-4 py-3 flex items-start gap-3 w-[min(92vw,28rem)]`}
        >
          <div className="shrink-0 text-current">{icons[m.type]}</div>
          <div className="flex-1 text-sm leading-5 font-medium">{m.text}</div>
          <button
            type="button"
            aria-label="Tutup notifikasi"
            onClick={() => setMessages((prev) => prev.filter((x) => x.id !== m.id))}
            className="opacity-80 hover:opacity-100 transition-opacity shrink-0"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
