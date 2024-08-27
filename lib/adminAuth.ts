import { auth } from "@clerk/nextjs/server";

const adminIds = [
    "user_2jNKdMMPq9BWP2eNyK1BqVNvH2f",
];

export const isAdmin = () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
}