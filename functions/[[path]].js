
export async function onRequest({ request }) {
  const incoming = new URL(request.url);
  const target = new URL("http://78.154.103.36:9421");

  target.pathname = incoming.pathname;
  target.search = incoming.search;

  const headers = new Headers(request.headers);
  headers.set("X-Forwarded-Host", incoming.host);
  headers.set("X-Forwarded-Proto", "https");

  try {
    return await fetch(target.toString(), {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method)
        ? undefined
        : request.body,
      redirect: "manual"
    });
  } catch (error) {
    return new Response("Proxy error: " + error.message, {
      status: 502
    });
  }
}
