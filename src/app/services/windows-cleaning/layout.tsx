import { Metadata } from "next";
import { windowsCleaningMetadata } from "../../pageMetadata";
import { FormProvider } from "../../../contexts/FormContext";
import { ReactNode } from 'react';

export const metadata: Metadata = windowsCleaningMetadata;

export default function ServiceLayout({ children }: { children: ReactNode }) {


  return (
    <FormProvider>
          {children} {/* Aquí se cargan los pasos del formulario */}
    </FormProvider>
  );
}