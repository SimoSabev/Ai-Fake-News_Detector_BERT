export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
            return new Response(JSON.stringify({ error: "API URL is not set" }), { status: 500 });
        }

        const res = await fetch(`${apiUrl}/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        if (!res.ok) {
            return new Response(JSON.stringify({ error: "Backend error" }), { status: res.status });
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
