import UserModel from "@/models/UserModel";
import { currentUser } from "@clerk/nextjs";

export const handleNewUserRegistration = async () => {
  try {
    const currentUserData = await currentUser();
    const clerkUserId = currentUserData?.id;

    // check if the user already exists in the database
    const user = await UserModel.findOne({ clerkUserId });
    if (user) {
      return;
    }

    // create a new user in the database
    const newUser = new UserModel({
      name:
        currentUserData?.username ||
        `${currentUserData?.firstName} ${currentUserData?.lastName}`,
      email: currentUserData?.emailAddresses[0].emailAddress,
      clerkUserId,
      profilePicUrl: currentUserData?.imageUrl,
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

export const getMongoDbUserIdFromClerkUserId = async (clerkUserId: string) => {
  try {
    const user = await UserModel.findOne({ clerkUserId });
    if (!user) {
      throw new Error("User not found");
    }
    return user._id;
  } catch (error:any) {
    throw new Error(error.message);
  }
}