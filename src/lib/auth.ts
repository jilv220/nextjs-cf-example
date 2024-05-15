import { Lucia } from "lucia";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { adapter } from "@/db/drizzle";

// hmmm, bad DX
const workerEnv = getRequestContext().env.WORKER_ENV as string;

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        // this sets cookies with super long expiration
        // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
        expires: false,
        attributes: {
            // set to `true` when using HTTPS
            secure: workerEnv === "production",
        },
    },
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
        };
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string;
}

