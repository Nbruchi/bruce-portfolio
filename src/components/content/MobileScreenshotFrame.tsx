import type { ReactElement, ReactNode } from "react";

type MobileScreenshotFrameProps = {
  children: ReactNode;
};

export function MobileScreenshotFrame({ children }: MobileScreenshotFrameProps): ReactElement {
  return (
    <div className="mb-6 flex gap-4 overflow-x-auto pb-2 [&>figure]:w-70 [&>figure]:shrink-0 sm:[&>figure]:w-80">
      {children}
    </div>
  );
}
