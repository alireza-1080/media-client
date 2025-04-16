import { currentUser } from "@clerk/nextjs/server";
import { configDotenv } from "dotenv";
import { UserType } from "@/types/user.type";
import SetUserState from "@/redux/setStateComponents/SetUserState";

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

  const userResponse = await fetch(`${serverUrl}/user/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clerkId, username, email, name, image }),
  });

  const userData: { user: UserType } = await userResponse.json();

  const { user } = userData;

  return <SetUserState user={user} />;
};

export default SyncUserAction;
