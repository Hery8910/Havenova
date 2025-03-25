import { Metadata } from "next";

import { kitchenAssemblyMetadata } from "../../pageMetadata";

export const metadata: Metadata = kitchenAssemblyMetadata;

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}