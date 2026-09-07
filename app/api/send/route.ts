import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { date, activity, detail, message } =
      await request.json();

    const toEmail = process.env.TO_EMAIL;

    if (!toEmail) {
      return Response.json(
        { error: "送信先メールが設定されていません" },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "ふたりのページ <onboarding@resend.dev>",
      to: [toEmail],
      subject: "💕 デートの回答が届いたよ",
      text: `
💕 デートの回答

📅 日にち
${date}

💕 何する？
${activity}

✨ 内容
${detail}

💌 ひとこと
${message || "なし"}
      `,
    });

    if (error) {
      console.error(error);

      return Response.json(
        { error: "メール送信に失敗しました" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "メール送信に失敗しました" },
      { status: 500 }
    );
  }
}