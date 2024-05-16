import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// summarize the text
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const assistant = await openai.beta.assistants.retrieve("asst_8DrT3ynB7KtJoQgw63nno19i");
    const thread = await openai.beta.threads.create();
    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: req.body.text,
      }
    );
    let run = await openai.beta.threads.runs.createAndPoll(
      thread.id,
      {
        assistant_id: assistant.id,
        instructions: "refrain from using explicit language",
      }
    );
    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );
      let content = messages.data.reverse().filter((message: any) => message.role === "assistant")[0].content[0]
      if (content.type === "text") {
        console.log("content.text.value", content.text.value);
        return res.status(200).json({ text: content.text.value });
      }
      else {
        return res.status(400).json({ error: 'Bad Request' });
      }
    } else {
      console.log(run.status);
    }
  }
  else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export default handler;
