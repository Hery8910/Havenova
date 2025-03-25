import { Metadata } from "next";

import { houseCleaningMetadata } from "../../pageMetadata";

export const metadata: Metadata = houseCleaningMetadata;

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}