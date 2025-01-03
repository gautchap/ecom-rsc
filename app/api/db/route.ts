export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await fetch(`${process.env.SITE_URL}/shop`);
        return new Response("OK", { status: 200 });
    } catch {
        return new Response("Internal Server Error", { status: 500 });
    }
}
