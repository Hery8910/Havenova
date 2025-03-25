import { Metadata } from "next";

import { furnitureAssemblyMetadata } from "../../pageMetadata";

export const metadata: Metadata = furnitureAssemblyMetadata;

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}