import { Branding, Typography } from "../types/client";

export function applyBrandingToDOM(themeBranding: Branding, typography: Typography) {
  const root = document.documentElement;


  const cssVars = {
    "--brand-primary": themeBranding.primaryColor,
    "--brand-secondary": themeBranding.secondaryColor,
    "--brand-accent": themeBranding.accentColor,
    "--bg-main": themeBranding.backgroundColor,
    "--bg-gradient": themeBranding.backgroundGradient,
    "--bg-card": themeBranding.cardBackground,
    "--shadow-dark": themeBranding.shadowDark,
    "--shadow-light": themeBranding.shadowLight,
    "--text-primary": themeBranding.textColorPrimary,
    "--text-secondary": themeBranding.textColorSecondary,
    "--text-inverted": themeBranding.textColorInverted,
    "--color-success": themeBranding.colorSuccess,
    "--color-error": themeBranding.colorError,
    "--color-warning": themeBranding.colorWarning,
    "--color-info": themeBranding.colorInfo,
    "--bg-success": themeBranding.bgSuccess,
    "--bg-error": themeBranding.bgError,
    "--bg-warning": themeBranding.bgWarning,
    "--bg-info": themeBranding.bgInfo,
  };

  Object.entries(cssVars).forEach(([key, value]) => {
    if (value) root.style.setProperty(key, value);
  });
 

  // Tipografía Google Fonts
  if (typography.isGoogleFont && typography.googleFontUrl) {
    let existingLink = document.querySelector("link[data-brand-font]");
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = typography.googleFontUrl;
      link.setAttribute("data-brand-font", "true");
      document.head.appendChild(link);
    } else {
      existingLink.setAttribute("href", typography.googleFontUrl);
    }
  }
}