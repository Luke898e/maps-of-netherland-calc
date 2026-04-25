"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ConsentPreferencesButton } from "@/components/consent-preferences-button";

const CONSENT_STORAGE_KEY = "gts_cookie_consent_v1";

interface StoredConsent {
  choice: "accept_all" | "essential_only";
  timestamp: string;
}

function hasStoredConsent(): boolean {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      return false;
    }
    const parsed = JSON.parse(raw) as StoredConsent;
    return parsed.choice === "accept_all" || parsed.choice === "essential_only";
  } catch {
    return false;
  }
}

function saveConsent(choice: StoredConsent["choice"]): void {
  const payload: StoredConsent = {
    choice,
    timestamp: new Date().toISOString()
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
}

export function GdprCookieBanner(): React.JSX.Element | null {
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const consentStatus = useSyncExternalStore(
    () => () => {},
    () => (hasStoredConsent() ? "stored" : "missing"),
    () => "stored"
  );

  if (consentStatus === "stored" || isDismissed) {
    return null;
  }

  return (
    <section
      className="fixed inset-x-0 bottom-3 z-[1200] mx-auto w-[min(96%,80rem)] rounded-xl border border-[#c9dbf3] bg-white p-4 shadow-[0_18px_42px_-26px_rgba(14,58,112,0.55)]"
      role="dialog"
      aria-label="Cookie and privacy notice"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-2 text-sm leading-6 text-[#203754]">
          <p className="font-semibold text-[#0f3364]">UK GDPR and EU GDPR cookie notice</p>
          <p>
            We use essential cookies for core functionality. Optional analytics and advertising cookies should run only
            with consent where legally required. Review our{" "}
            <Link href="/privacy-policy" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/cookie-policy" className="text-[#17467f] underline decoration-[#7aa6dd] underline-offset-2">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              saveConsent("essential_only");
              setIsDismissed(true);
            }}
          >
            Essential Only
          </Button>
          <Button
            type="button"
            className="bg-[#12447d] text-white hover:bg-[#0f3968]"
            onClick={() => {
              saveConsent("accept_all");
              setIsDismissed(true);
            }}
          >
            Accept All
          </Button>
          <ConsentPreferencesButton />
        </div>
      </div>
    </section>
  );
}
