import { cn } from "@/lib/utils";
import { Flame, Gem, Lock } from "lucide-react";
import type { Product } from "@/lib/types";

function Badge({
  children,
  className,
  icon,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function ProductBadges({ product }: { product: Product }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {product.stock_status === "sold_out" && (
        <Badge className="bg-maroon-deep text-on-brand">Habis</Badge>
      )}
      {product.is_secret && (
        <Badge className="bg-maroon text-on-brand" icon={<Lock size={12} />}>
          Secret
        </Badge>
      )}
      {product.is_rare && !product.is_secret && (
        <Badge className="bg-coral text-on-brand" icon={<Gem size={12} />}>
          Rare
        </Badge>
      )}
      {product.is_new && (
        <Badge className="bg-flame text-on-brand">
          Baru
        </Badge>
      )}
      {product.is_boxa_approved && (
        <Badge className="bg-ember text-ink" icon={<Flame size={12} />}>
          BOXA Approved
        </Badge>
      )}
      {product.is_bib && (
        <Badge
          className="bg-white text-ink-soft border border-line"
          title="Box in Box — dus asli disimpan dalam dus pelindung tambahan."
        >
          BIB
        </Badge>
      )}
      {product.is_ofc && (
        <Badge
          className="bg-white text-ink-soft border border-line"
          title="Original Factory Condition — belum pernah dibuka sejak pabrik."
        >
          OFC
        </Badge>
      )}
    </div>
  );
}
