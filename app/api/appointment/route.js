// app/api/appointment/route.js
import {
  getAdminEmailTemplate,
  getCustomerEmailTemplate,
} from "@/app/helpers/emailTemplate";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const body = await req.json();
  const { name, phone, email, branchId, offerId, date, time, paymentMethod } =
    body || {};

  try {
    if (!process.env.RESEND_API_KEY || !process.env.BOOKING_EMAIL) {
      console.warn("Missing RESEND_API_KEY or BOOKING_EMAIL");
    } else {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Email to your team
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "Bookings <onboarding@resend.dev>",
        to: process.env.BOOKING_EMAIL,
        replyTo: email,
        subject: "🎉 حجز جديد - Hair Style",
        html: getAdminEmailTemplate({
          name,
          phone,
          email,
          branchId,
          offerId,
          date,
          time,
          paymentMethod,
        }),
      });

      // Optional: confirmation to customer (if email provided)
      if (email) {
        await resend.emails.send({
          from:
            process.env.FROM_EMAIL ||
            "Hair Style <no-reply@hairstyleksasalon.com>",
          to: email,
          subject: "✨ تأكيد حجزك في Hair Style",
          html: getCustomerEmailTemplate({
            name,
            phone,
            branchId,
            offerId,
            date,
            time,
            paymentMethod,
          }),
        });
      }
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return new Response("email-failed", { status: 500 });
  }
}
