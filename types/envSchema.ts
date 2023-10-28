import z from "zod";

const envSchema = z.object({
    GOOGLE_CLIENT_ID: z.string().trim().min(1),
    GOOGLE_CLIENT_SECRET: z.string().trim().min(1),
    NEXTAUTH_URL: z.string().trim().min(1).url(),
    NEXTAUTH_SECRET: z.string().trim().min(1),
    PORT: z.number().default(3000),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    DATABASE_URL: z.string().trim().min(1),
    DATABASE_DIRECT_URL: z.string().trim().min(1),
    SMTP_USER: z.string().trim().min(1),
    SMTP_PASSWORD: z.string().trim().min(1),
    SMTP_HOST: z.string().trim().min(1),
    SMTP_PORT: z.number().min(1),
    EMAIL_FROM: z.string().trim().min(1).email(),
});

const envServer = envSchema.safeParse({
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_DIRECT_URL: process.env.DATABASE_DIRECT_URL,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    EMAIL_FROM: process.env.EMAIL_FROM,
});

if (!envServer.success) {
    console.error(envServer.error.issues);
    throw new Error("There is an error with the server environment variables");
    process.exit(1);
}

export const envServerSchema = envServer.data;
export type EnvSchemaType = z.infer<typeof envSchema>;
