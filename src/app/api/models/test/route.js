import { NextResponse } from "next/server";
import { pingModelByKind } from "./ping";
import { getInternalRequestToken } from "@/lib/auth/internalRequest";

// POST /api/models/test - Ping a single model via internal completions or embeddings
export async function POST(request) {
  try {
    const { model, kind } = await request.json();
    if (!model) return NextResponse.json({ error: "Model required" }, { status: 400 });
    const baseUrl = new URL(request.url).origin;
    const internalToken = getInternalRequestToken();
    const result = await pingModelByKind(model, kind || "llm", baseUrl, internalToken
      ? { "x-9r-internal-token": internalToken }
      : {});
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
