export async function onRequest() {
  const target = "http://78.154.103.36:9421/";

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
