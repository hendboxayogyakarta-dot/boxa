import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Not every toy someone wants is in the catalog yet. This opens WhatsApp
 * with a pre-filled message so they can ask BOXA to source it — no new
 * backend needed, just routes through the same WhatsApp contact already
 * used everywhere else on the site.
 */
export function RequestToyButton({ whatsappNumber, className = "" }: { whatsappNumber: string; className?: string }) {
  const message = encodeURIComponent("Halo BOXA, aku mau request mainan: ");
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-maroon px-4 py-2 text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-on-brand",
        className
      )}
    >
      <MessageCircle size={15} />
      Request Mainan
    </a>
  );
}
