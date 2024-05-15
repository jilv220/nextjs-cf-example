/**
 * Drizzle driver for D1 local development is currently bugged
 */
export default {
    schema: "./src/db/schemas/*",
    out: "./migrations",
    dialect: "sqlite",
    driver: "d1-http",
    dbCredentials: {
        url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/aabff852100e1c96a8ca7fd300008a79f11613d93058416d437e211b82b52a2b.sqlite"
    },
};