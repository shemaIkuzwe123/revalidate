import { createUser, deleteUser, updateUser } from "@/lib/actions";
import { User } from "@/lib/db/schema";
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
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.log(svix_id, svix_signature, svix_timestamp);

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

  const eventType = evt.type;

  if (eventType == "user.created") {
    const { id, first_name, email_addresses, last_name, image_url } = evt.data;
    const user = {
      id,
      email: email_addresses[0].email_address,
      first_name,
      last_name,
      imageUrl: image_url,
    } as User;
    await createUser(user);
  }

  if (eventType == "user.updated") {
    const { id, first_name, email_addresses, last_name, image_url } = evt.data;
    const user = {
      id,
      email: email_addresses[0].email_address,
      first_name,
      last_name,
      imageUrl: image_url,
    } as User;
    await updateUser(user);
  }

  if (eventType == "user.deleted") {
    const { id } = evt.data;
    if (id) {
      await deleteUser(id);
    }
  }

  return NextResponse.json("success", { status: 200 });
}
