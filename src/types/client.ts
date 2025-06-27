// Nueva interfaz para LOGOS
export interface Logos {
  main: string;           // Logo principal (URL)
  mainDark?: string;      // Logo para dark mode (URL)
  alt?: string;           // Alternativo
  favicon?: string;       // Favicon
}

// Nueva interfaz para TIPOGRAFÍA
export interface Typography {
  fontFamily: string;           // Ej: 'Roboto'
  isGoogleFont: boolean;        // true/false
  googleFontUrl?: string;       // Solo si es Google Fonts
  weights?: string[];           // ["400", "700", ...]
  secondaryFontFamily?: string; // Opcional
}

// Interfaz simplificada del cliente
export interface Branding {
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  cardBackground?: string;
  shadowDark?: string;
  shadowLight?: string;
  textColorPrimary?: string;
  textColorSecondary?: string;
  textColorInverted?: string;
  colorSuccess?: string;
  colorError?: string;
  colorWarning?: string;
  colorInfo?: string;
  bgSuccess?: string;
  bgError?: string;
  bgWarning?: string;
  bgInfo?: string;
  fontUrl?: string;
}

export interface Images {
  backgroundImage?: string;
}

export interface Schedule {
  [day: string]: { start: string; end: string };
}

export interface Texts {
  [lang: string]: any; // puedes tipar más adelante si defines un esquema fijo
}

export interface ClientConfig {
  _id: string;
  slug: string;
  companyName: string;
  branding: {
    light: Branding;
    dark: Branding;
  };
  images: Images;
  logos: Logos;
  typography: Typography;
  schedule: Schedule;
  texts: Texts;
}

export interface ClientContextProps {
  client: ClientConfig | null;
  loading: boolean;
}