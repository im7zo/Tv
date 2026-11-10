export async function onRequest() {
  const target = "https://e5s59x9hsk.apps.bot-hosting.cloud";

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html,application/xhtml+xml"
      },
      redirect: "manual"
    });

    const body = await response.text();

    return new Response(
      "Status: " + response.status +
      "\nContent-Type: " + (response.headers.get("content-type") || "unknown") +
      "\n\n" + body.slice(0, 1000),
      {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      }
    );
  } catch (error) {
    return new Response("Fetch failed: " + error.message, {
      status: 502
    });
  }
}
