import { PropsWithChildren } from "react";

export function MainContainer({ children }: PropsWithChildren) {
  return <main className="max-w-[1440px] mx-auto px-4 py-6">{children}</main>;
}
