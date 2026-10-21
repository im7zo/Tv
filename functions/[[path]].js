export async function onRequest({ request }) {
  const target = "http://78.154.103.36:9421/";

  try {
    const response = await fetch(target, {
      redirect: "manual"
    });

    return new Response(
      "Origin status: " + response.status +
      "\nOrigin URL: " + response.url +
      "\nRedirect: " + (response.headers.get("location") || "none"),
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8"
        }
      }
    );
  } catch (error) {
    return new Response("Fetch failed: " + error.message, {
      status: 502
    });
  }
}
