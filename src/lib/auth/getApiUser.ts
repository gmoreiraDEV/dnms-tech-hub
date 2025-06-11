import { verifyApiToken } from "./verifyApiToken";

export function getApiUser(req: Request) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    if (!token) return null;

    const payload = verifyApiToken(token);
    return payload;
}
