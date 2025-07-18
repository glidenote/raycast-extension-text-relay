import { Action, ActionPanel, Form, showToast, Toast, Clipboard } from "@raycast/api";

interface FormValues {
  text: string;
  delay?: string;
}

export default function SendText() {
  async function handleSubmit(values: FormValues) {
    const { text, delay } = values;
    const delayMs = delay ? parseInt(delay) * 1000 : 100;

    try {
      await showToast({
        style: Toast.Style.Animated,
        title: "Sending text...",
      });

      // 遅延を適用
      if (delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      // Raycast Clipboard.paste APIを使用してテキストを送信
      // このAPIは自動的にRaycastウィンドウを閉じて、
      // 以前アクティブだったアプリケーションにテキストをペーストします
      await Clipboard.paste(text);

      // 成功時のトースト表示
      await showToast({
        style: Toast.Style.Success,
        title: "Text sent successfully",
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to send text",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Send Text" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="text"
        title="Text to Send"
        placeholder="Enter the text you want to send to the active window..."
        autoFocus
      />
      <Form.TextField
        id="delay"
        title="Delay (seconds)"
        placeholder="0.1"
        defaultValue="0.1"
        info="Time to wait before sending the text (allows you to switch to the target window)"
      />
    </Form>
  );
}
