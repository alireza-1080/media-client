import { currentUser } from "@clerk/nextjs/server";
import { configDotenv } from "dotenv";

configDotenv();

const SyncUserAction = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const {
    id: clerkId,
    username,
    emailAddresses,
    fullName: name,
    imageUrl: image,
  } = clerkUser;
  const { emailAddress: email } = emailAddresses[0];

  const serverUrl = process.env.SERVER_URL as string;

  await fetch(`${serverUrl}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clerkId, username, email, name, image }),
  });
};

export default SyncUserAction;
