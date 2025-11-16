import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export async function POST(request: Request) {
  try {
    // delegate to Better Auth handler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await (handler as any).POST(request);
  } catch (error) {
    // log minimal information and return a generic 500 response
    // avoid leaking internal details to the client
    // keep a concise server-side log for debugging
    console.error("Auth POST handler unexpected error", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request: Request) {
  try {
    // delegate to Better Auth handler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await (handler as any).GET(request);
  } catch (error) {
    console.error("Auth GET handler unexpected error", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
