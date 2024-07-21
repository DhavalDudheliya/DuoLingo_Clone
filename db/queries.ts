import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { userProgress } from "./schema";


export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();

    return data;
})

export const getUserProgress = cache(async () => {
    const {userId} = await auth();

    if(!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    return data;
});