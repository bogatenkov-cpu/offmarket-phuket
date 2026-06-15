import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  isBroker?: boolean;
  company?: string;
  property?: string;
  lang?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram env vars are not configured");
    return NextResponse.json(
      { ok: false, error: "Server is not configured" },
      { status: 500 }
    );
  }

  let data: InquiryPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required" },
      { status: 400 }
    );
  }

  const lines = [
    "\u{1F3DD} <b>Новая заявка с сайта</b>",
    "",
    `\u{1F464} <b>Имя:</b> ${escapeHtml(name)}`,
    `✉️ <b>Email:</b> ${escapeHtml(email)}`,
  ];

  if (data.phone?.trim()) lines.push(`\u{1F4DE} <b>Телефон:</b> ${escapeHtml(data.phone.trim())}`);
  if (data.isBroker) {
    lines.push(`\u{1F4BC} <b>Брокер:</b> да${data.company?.trim() ? ` (${escapeHtml(data.company.trim())})` : ""}`);
  }
  if (data.property?.trim()) lines.push(`\u{1F3E0} <b>Объект:</b> ${escapeHtml(data.property.trim())}`);
  if (data.message?.trim()) lines.push(`\u{1F4AC} <b>Сообщение:</b> ${escapeHtml(data.message.trim())}`);
  if (data.lang) lines.push(`\u{1F310} <b>Язык:</b> ${escapeHtml(data.lang)}`);

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!tgRes.ok) {
      const detail = await tgRes.text();
      console.error("Telegram API error:", detail);
      return NextResponse.json(
        { ok: false, error: "Failed to deliver" },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Telegram request failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to deliver" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
