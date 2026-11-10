
export async function onRequest(context) {
  const target = "https://e5s59x9hsk.apps.bot-hosting.cloud";

  const url = new URL(context.request.url);
  const targetUrl = target + url.pathname + url.search;

  try {
    const response = await fetch(targetUrl, {
      method: context.request.method,
      headers: context.request.headers,
      body: ["GET", "HEAD"].includes(context.request.method)
        ? undefined
        : context.request.body,
      redirect: "follow"
    });

    const headers = new Headers(response.headers);

    headers.delete("content-encoding");
    headers.delete("content-length");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });

  } catch (error) {
    return new Response("Proxy Error: " + error.message, {
      status: 502
    });
  }
}
