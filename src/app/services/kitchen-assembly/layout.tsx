import { Metadata } from "next";
import { FormProvider } from "../../../contexts/FormContext";
import { ReactNode } from 'react';
import { kitchenAssemblyMetadata } from "../../pageMetadata";

export const metadata: Metadata = kitchenAssemblyMetadata;

export default function ServiceLayout({ children }: { children: ReactNode }) {

  
  return (
    <FormProvider>
          {children} {/* Aquí se cargan los pasos del formulario */}
    </FormProvider>
  );
}