import { currentUser } from "@clerk/nextjs/server";
import { configDotenv } from "dotenv";
import NotificationsClient from "./_notificationsClient";

configDotenv();
const serverUrl = process.env.SERVER_URL;

const NotificationsPage = async () => {
  const user = await currentUser();

  const clerkId = user?.id;

  const res = await fetch(`${serverUrl}/notification/get-all`, {
    method: "POST",
    body: JSON.stringify({ clerkId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  const notifications = data.notifications;

  return <NotificationsClient notifications={notifications} />;
};

export default NotificationsPage;
