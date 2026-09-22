"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitButton({
  children,
  pendingText = "Menyimpan...",
  className = "rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-deep disabled:opacity-60",
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 size={15} className="animate-spin" />
          {pendingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
