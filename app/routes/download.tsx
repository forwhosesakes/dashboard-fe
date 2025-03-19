import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request, context }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    
    const encodedKey = url.pathname.split("/")[2];
    const decodedKey = decodeURIComponent(encodedKey);
    
    if (!decodedKey) {
      return Response.json({ error: "No file key provided" }, { status: 400 });
    }

    const object: R2ObjectBody | null = await (context.cloudflare as any).env.KEDAN_DASHBOARD_BUCKET.get(decodedKey);
    
    if (!object) {
      return Response.json({ error: "File not found" }, { status: 404 });
    }

    const filename = decodedKey.split("-").slice(1).join("-") || decodedKey;
    
    const content = await object.blob();

    const encodedFilename = encodeURIComponent(filename).replace(/['()]/g, escape);

    return new Response(content, {
      headers: {
        "Content-Type": object.httpMetadata?.contentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodedFilename}`, // Removed extra quote
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return Response.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}