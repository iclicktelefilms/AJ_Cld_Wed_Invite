export interface UploadResult {
  url: string;
  key: string;
  size: number;
}

export const getR2PublicUrl = (key: string): string => {
  const baseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  return `${baseUrl}/${key}`;
};

export const generateMediaKey = (
  studioId: string,
  invitationId: string,
  filename: string
): string => {
  const timestamp = Date.now();
  const ext = filename.split(".").pop();
  return `studios/${studioId}/invitations/${invitationId}/${timestamp}.${ext}`;
};
