import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>): React.JSX.Element {
  return <label className={cn("text-sm font-semibold text-[#143e74]", className)} {...props} />;
}

export { Label };
