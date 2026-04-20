"use client";

import { useState } from "react";

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

    setHint("Consent panel is temporarily unavailable. Please refresh and try again shortly.");
  };

  return (
    <div className="space-y-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 px-0 text-[#17467f] hover:bg-transparent hover:text-[#0f3364]"
        onClick={onOpenPreferences}
      >
        Manage Consent
      </Button>
      {hint ? <p className="max-w-xs text-xs text-[#6b7d96]">{hint}</p> : null}
    </div>
  );
}
