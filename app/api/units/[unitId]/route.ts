import { NextResponse } from "next/server"

import db from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { isAdmin } from "@/lib/adminAuth"
import { units } from "@/db/schema"


export const GET = async (
    req: Request,
    { params }: { params: { unitId: number } }
) => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    const data = await db.query.units.findFirst({
        where: eq(units.id, params.unitId)
    })

    return NextResponse.json(data)
};

export const PUT = async (
    req: Request,
    { params }: { params: { unitId: number } }
) => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    const body = await req.json();
    const data = await db.update(units).set({
        ...body
    }).where(eq(units.id, params.unitId)).returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    { params }: { params: { unitId: number } }
) => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    const data = await db.delete(units)
        .where(eq(units.id, params.unitId)).returning()

    return NextResponse.json(data[0]);
};
