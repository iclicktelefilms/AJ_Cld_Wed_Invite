export const generateQRCodeUrl = (text: string, size = 256): string => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&format=svg&margin=10`;
};
