import { Metadata } from "next";

import { homeServiceMetadata } from "../../pageMetadata";

export const metadata: Metadata = homeServiceMetadata;

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}