import { Metadata } from "next";
import { FormProvider } from "../../../contexts/FormContext";
import { ReactNode} from 'react';
import { kitchenCleaningMetadata } from "../../pageMetadata";


export const metadata: Metadata = kitchenCleaningMetadata;

export default function ServiceLayout({ children }: { children: ReactNode }) {


  return (
    <FormProvider>
          {children} {/* Aquí se cargan los pasos del formulario */}
    </FormProvider>
  );
}