import { getApiUser } from "@/lib/auth/getApiUser";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const user = getApiUser(req);
    console.log(user);

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ message: "Acesso autorizado!", user });
}
