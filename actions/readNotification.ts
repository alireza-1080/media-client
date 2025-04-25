"use server";
import { configDotenv } from "dotenv";

configDotenv();

const serverUrl = process.env.SERVER_URL;
const readNotification = async (notificationsIds: string[]) => {
  await fetch(`${serverUrl}/notification/mark-as-read`, {
    method: "POST",
    body: JSON.stringify({ notificationsIds }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return;
};

export default readNotification;
