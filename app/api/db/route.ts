export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        await fetch(`${process.env.SITE_URL}/shop`);
        return new Response("OK", { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
