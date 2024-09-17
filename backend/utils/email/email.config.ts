import { MailtrapClient } from "mailtrap";

const apiToken = process.env.MAILTRAP_API_TOKEN;
if (!apiToken) {
  throw new Error("MAILTRAP_API_TOKEN is not defined in the environment variables");
}

export const mailtrapClient = new MailtrapClient({
  token: apiToken,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Ondrej",
};