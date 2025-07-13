export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        const res = await fetch("https://r8h5wxrr-8000.euw.devtunnels.ms/predict", {
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
    } catch {
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
