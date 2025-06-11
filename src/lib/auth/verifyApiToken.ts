import jwt from "jsonwebtoken";

export function verifyApiToken(token: string) {
    const secret = process.env.API_JWT_SECRET!;
    try {
        const decoded = jwt.verify(token, secret) as { userId: string };
        return decoded;
    } catch (err) {
        return null;
    }
}
