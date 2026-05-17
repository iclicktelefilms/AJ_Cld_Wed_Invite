import { useMemo } from "react";
import { Theme } from "@/types";
import { getThemeById } from "@/data/themes";

export const useTheme = (themeId?: string): Theme | null => {
  return useMemo(() => {
    if (!themeId) return null;
    return getThemeById(themeId) ?? null;
  }, [themeId]);
};

export const useThemeStyles = (theme: Theme | null) => {
  return useMemo(() => {
    if (!theme) return {};
    return {
      "--color-primary": theme.colors.primary,
      "--color-secondary": theme.colors.secondary,
      "--color-background": theme.colors.background,
      "--color-surface": theme.colors.surface ?? theme.colors.background,
      "--color-text": theme.colors.text,
      "--color-text-muted": theme.colors.textMuted ?? theme.colors.text,
      "--color-accent": theme.colors.accent ?? theme.colors.primary,
      "--color-border": theme.colors.border ?? `${theme.colors.primary}40`,
      "--font-heading": theme.fonts.heading,
      "--font-body": theme.fonts.body,
    } as React.CSSProperties;
  }, [theme]);
};
