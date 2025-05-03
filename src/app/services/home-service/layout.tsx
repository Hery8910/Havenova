import { Metadata } from "next";
import { FormProvider } from "../../../contexts/FormContext";
import { ReactNode, useState } from 'react';
import { homeServiceMetadata } from "../../pageMetadata";


export const metadata: Metadata = homeServiceMetadata;



export default function ServiceLayout({ children }: { children: ReactNode }) {


  return (
    <FormProvider>
          {children} {/* Aquí se cargan los pasos del formulario */}
    </FormProvider>
  );
}