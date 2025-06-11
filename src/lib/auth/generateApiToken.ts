import jwt from "jsonwebtoken";

export function generateApiToken(userId: string) {
    const payload = { userId };
    const secret = process.env.API_JWT_SECRET!;
    const options = { expiresIn: "7d" as const };

    return jwt.sign(payload, secret, options);
}
