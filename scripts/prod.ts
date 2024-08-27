import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");

        // Delete all existing data
        await Promise.all([
            db.delete(schema.userProgress),
            db.delete(schema.challenges),
            db.delete(schema.units),
            db.delete(schema.lessons),
            db.delete(schema.courses),
            db.delete(schema.challengeOptions),
            db.delete(schema.userSubscription),
        ]);

        // Insert courses
        const courses = await db
            .insert(schema.courses)
            .values([
                { title: "German", imageSrc: "/de.svg" },
            ])
            .returning();

        // For each course, insert units
        for (const course of courses) {
            const units = await db
                .insert(schema.units)
                .values([
                    {
                        courseId: course.id,
                        title: "Unit 1",
                        description: `Learn the basics of ${course.title}`,
                        order: 1,
                    },
                    {
                        courseId: course.id,
                        title: "Unit 2",
                        description: `Learn intermediate ${course.title}`,
                        order: 2,
                    },
                ])
                .returning();

            // For each unit, insert lessons
            for (const unit of units) {
                const lessons = await db
                    .insert(schema.lessons)
                    .values([
                        { unitId: unit.id, title: "Nouns", order: 1 },
                        { unitId: unit.id, title: "Verbs", order: 2 },
                        { unitId: unit.id, title: "Adjectives", order: 3 },
                        { unitId: unit.id, title: "Phrases", order: 4 },
                        { unitId: unit.id, title: "Sentences", order: 5 },
                    ])
                    .returning();

                // For each lesson, insert challenges
                for (const lesson of lessons) {
                    const challenges = await db
                        .insert(schema.challenges)
                        .values([
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the man"?',
                                order: 1,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the woman"?',
                                order: 2,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the boy"?',
                                order: 3,
                            },
                            {
                                lessonId: lesson.id,
                                type: "ASSIST",
                                question: '"the man"',
                                order: 4,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the zombie"?',
                                order: 5,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the robot"?',
                                order: 6,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the girl"?',
                                order: 7,
                            },
                            {
                                lessonId: lesson.id,
                                type: "ASSIST",
                                question: '"the zombie"',
                                order: 8,
                            },
                        ])
                        .returning();

                    // For each challenge, insert challenge options
                    for (const challenge of challenges) {
                        if (challenge.order === 1) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "der Mann",
                                    imageSrc: "/man.svg",
                                    audioSrc: "/de_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "die Frau",
                                    imageSrc: "/woman.svg",
                                    audioSrc: "/de_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "der Junge",
                                    imageSrc: "/boy.svg",
                                    audioSrc: "/de_boy.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 2) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "die Frau",
                                    imageSrc: "/woman.svg",
                                    audioSrc: "/de_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "der Junge",
                                    imageSrc: "/boy.svg",
                                    audioSrc: "/de_boy.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "der Mann",
                                    imageSrc: "/man.svg",
                                    audioSrc: "/de_man.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 3) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "die Frau",
                                    imageSrc: "/woman.svg",
                                    audioSrc: "/de_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "der Mann",
                                    imageSrc: "/man.svg",
                                    audioSrc: "/de_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "der Junge",
                                    imageSrc: "/boy.svg",
                                    audioSrc: "/de_boy.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 4) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "die Frau",
                                    audioSrc: "/de_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "der Mann",
                                    audioSrc: "/de_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "der Junge",
                                    audioSrc: "/de_boy.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 5) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "der Mann",
                                    imageSrc: "/man.svg",
                                    audioSrc: "/de_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "die Frau",
                                    imageSrc: "/woman.svg",
                                    audioSrc: "/de_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "der Zombie",
                                    imageSrc: "/zombie.svg",
                                    audioSrc: "/de_zombie.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 6) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "der Roboter",
                                    imageSrc: "/robot.svg",
                                    audioSrc: "/de_robot.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "der Zombie",
                                    imageSrc: "/zombie.svg",
                                    audioSrc: "/de_zombie.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "der Junge",
                                    imageSrc: "/boy.svg",
                                    audioSrc: "/de_boy.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 7) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "das Mädchen",
                                    imageSrc: "/girl.svg",
                                    audioSrc: "/de_girl.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "der Zombie",
                                    imageSrc: "/zombie.svg",
                                    audioSrc: "/de_zombie.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "der Mann",
                                    imageSrc: "/man.svg",
                                    audioSrc: "/de_man.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 8) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "die Frau",
                                    audioSrc: "/de_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "der Zombie",
                                    audioSrc: "/de_zombie.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "der Junge",
                                    audioSrc: "/de_boy.mp3",
                                },
                            ]);
                        }
                    }
                }
            }
        }
        console.log("Database seeded successfully");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
};

main();