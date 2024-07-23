import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";
import "dotenv/config"

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "German",
                imageSrc: "/de.svg",
            },
            {
                id: 2,
                title: "Hindi",
                imageSrc: "/in.svg",
            },
            {
                id: 3,
                title: "English",
                imageSrc: "/en.svg",
            },
            {
                id: 4,
                title: "Italian",
                imageSrc: "/it.svg",
            },
        ])

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the databse");
    }
};

main();