import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { generateApiToken } from "@/lib/auth/generateApiToken";
import { NextResponse } from "next/server";
import { GetServerSessionOptions } from "@/types/session";

export async function GET() {
    const session = await getServerSession(authOptions as unknown as GetServerSessionOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = generateApiToken(session.user.id as string);
    return NextResponse.json({ token });
}
