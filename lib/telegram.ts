/**
 * Escapes special characters for Telegram MarkdownV2.
 * @see https://core.telegram.org/bots/api#markdownv2-style
 */
export function escapeMarkdownV2(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}

export async function sendTelegramMessage(message: string, isMarkdownV2 = true) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram bot token or chat ID is missing");
    return { success: false, error: "Configuration missing" };
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: isMarkdownV2 ? "MarkdownV2" : "Markdown",
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.description || "Failed to send message");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}


export async function sendTelegramMessagePrivate(message: string, isMarkdownV2 = true) {
  const token = "6992037726:AAFeugZ7OgZzh238gojHrF9SWbjHhNXH2Og";
  const chatId = 5982131598;

  if (!token || !chatId) {
    console.error("Telegram bot token or chat ID is missing");
    return { success: false, error: "Configuration missing" };
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: isMarkdownV2 ? "MarkdownV2" : "Markdown",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.description || "Failed to send message");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
