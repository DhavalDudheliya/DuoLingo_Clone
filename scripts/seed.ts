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
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

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

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, // German
                title: "Units 1",
                description: "Learn the basics of German",
                order: 1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Nouns",
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Nouns",
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Nouns",
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Nouns",
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Nouns",
            },
            {
                id: 6,
                unitId: 1,
                order: 6,
                title: "Nouns",
            },
            {
                id: 7,
                unitId: 1,
                order: 7,
                title: "Nouns",
            },
            {
                id: 8,
                unitId: 1,
                order: 8,
                title: "Nouns",
            },
            {
                id: 9,
                unitId: 1,
                order: 9,
                title: "Nouns",
            },
            {
                id: 10,
                unitId: 1,
                order: 10,
                title: "Nouns",
            },
            {
                id: 11,
                unitId: 1,
                order: 11,
                title: "Nouns",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, // Nouns
                type: "SELECT",
                order: 1,
                question: 'Which one of these is "the man"',
            },
            {
                id: 2,
                lessonId: 1, // Nouns
                type: "ASSIST",
                order: 2,
                question: '"the man"',
            },
            {
                id: 3,
                lessonId: 1, // Nouns
                type: "SELECT",
                order: 3,
                question: 'Which one of these is "the robot"',
            }
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: true,
                text: "der Mann",
                audioSrc: "/de_man.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/woman.svg",
                correct: false,
                text: "die Frau",
                audioSrc: "/de_woman.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/robot.svg",
                correct: false,
                text: "der Roboter",
                audioSrc: "/de_robot.mp3",
            },
            {
                challengeId: 2,
                correct: true,
                text: "der Mann",
                audioSrc: "/de_man.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "die Frau",
                audioSrc: "/de_woman.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "der Roboter",
                audioSrc: "/de_robot.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/man.svg",
                correct: false,
                text: "der Mann",
                audioSrc: "/de_man.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/woman.svg",
                correct: false,
                text: "die Frau",
                audioSrc: "/de_woman.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/robot.svg",
                correct: true,
                text: "der Roboter",
                audioSrc: "/de_robot.mp3",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2, // Verbs
                type: "SELECT",
                order: 1,
                question: 'Which one of these is "the man"',
            },
            {
                id: 5,
                lessonId: 2, // Verbs
                type: "ASSIST",
                order: 2,
                question: '"the man"',
            },
            {
                id: 6,
                lessonId: 2, // Verbs
                type: "SELECT",
                order: 3,
                question: 'Which one of these is "the robot"',
            }
        ]);


        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the databse");
    }
};

main();