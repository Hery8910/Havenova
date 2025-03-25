import { Metadata } from "next";

import { kitchenCleaningMetadata } from "../../pageMetadata";

export const metadata: Metadata = kitchenCleaningMetadata;

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}