export const generateSlug = (brideName: string, groomName: string): string => {
  const clean = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12);
  const random = Math.random().toString(36).slice(2, 6);
  return `${clean(brideName)}-weds-${clean(groomName)}-${random}`;
};
