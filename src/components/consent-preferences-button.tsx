"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type GoogleFcWindow = Window & {
  googlefc?: {
    callbackQueue?: Array<() => void>;
    showRevocationMessage?: () => void;
  };
};

export function ConsentPreferencesButton(): React.JSX.Element {
  const [hint, setHint] = useState<string>("");

  const onOpenPreferences = (): void => {
    const w = window as GoogleFcWindow;
    const callbackQueue = w.googlefc?.callbackQueue;
    const showRevocationMessage = w.googlefc?.showRevocationMessage;
    if (callbackQueue && showRevocationMessage) {
      callbackQueue.push(showRevocationMessage);
      setHint("");
      return;
    }

    if (showRevocationMessage) {
      showRevocationMessage();
      setHint("");
      return;
    }

    setHint("Consent panel is temporarily unavailable right now.");
  };

  return (
    <div className="space-y-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-fit rounded-md border border-[#d4e3f8] px-2 text-[#17467f] hover:bg-[#eef5ff] hover:text-[#0f3364]"
        onClick={onOpenPreferences}
      >
        Manage Consent
      </Button>
      {hint ? (
        <p className="max-w-xs text-xs text-[#6b7d96]" aria-live="polite">
          {hint} You can still review data controls on the{" "}
          <Link href="/consent" className="underline decoration-[#8ab0df] underline-offset-2 hover:text-[#3d5f85]">
            Consent page
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
