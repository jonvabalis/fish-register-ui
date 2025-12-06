export interface DecodedToken {
  userUUID: string;
  role: string;
  exp?: number;
  iat?: number;
}

export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));
    return decoded as DecodedToken;
  } catch {
    return null;
  }
};
