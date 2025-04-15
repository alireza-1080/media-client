import { currentUser } from "@clerk/nextjs/server";
import { configDotenv } from "dotenv";
import UserUpdate from "../updateStateComponents/UserUpdate";
import { UserType } from "@/types/user.type";

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

  const res = await fetch(`${serverUrl}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clerkId, username, email, name, image }),
  });

  const data: UserType = await res.json();

  return <UserUpdate userData={data} />;
};

export default SyncUserAction;
