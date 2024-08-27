import { NextResponse } from "next/server"

import db from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { isAdmin } from "@/lib/adminAuth"
import { challenges } from "@/db/schema"


export const GET = async (
    req: Request,
    { params }: { params: { challengeId: number } }
) => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    const data = await db.query.challenges.findFirst({
        where: eq(challenges.id, params.challengeId)
    })

    return NextResponse.json(data)
};

export const PUT = async (
    req: Request,
    { params }: { params: { challengeId: number } }
) => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    const body = await req.json();
    const data = await db.update(challenges).set({
        ...body
    }).where(eq(challenges.id, params.challengeId)).returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    { params }: { params: { challengeId: number } }
) => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    const data = await db.delete(challenges)
        .where(eq(challenges.id, params.challengeId)).returning()

    return NextResponse.json(data[0]);
};
