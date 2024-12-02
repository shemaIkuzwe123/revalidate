import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: NextRequest) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    throw new Error("Error: Please add SIGNING_SECRET");
  }

  const Wb = new Webhook(SIGNING_SECRET);
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix_id");
  const svix_timestamp = headerPayload.get("svix_timestamp");
  const svix_signature = headerPayload.get("svix_signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json("Error missing svix headers", { status: 404 });
  }
  const payload = await req.json();
  const body = JSON.stringify(payload);
  let evt: WebhookEvent;

  try {
    evt = Wb.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.log(err);

    return NextResponse.json("Error something went wrong", { status: 500 });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  return NextResponse.json("success payload received", { status: 200 });
}
