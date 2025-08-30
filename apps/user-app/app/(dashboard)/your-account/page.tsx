import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import { authOptions } from "../../lib/authOption";
import { SignOutButton } from "../../../components/auth/SignOutButton";
import SessionGuard from "../../../components/auth/SessionGuard";
import { getUserWithDetails } from "../../lib/userService";

export default async function YourAccount() {
  const user = await getUserWithDetails();

  if (!user) {
    return <div>Loading....</div>;
  }
  const { kyc } = user;
  return (
    <SessionGuard>
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Welcome {kyc?.fullName ?? user.username}
        </h1>

        <h1 className="text-3xl font-bold">username: {user?.username}</h1>
        <h1 className="text-3xl font-bold">
          Father Name: {kyc?.fatherName}
        </h1>

        <h1 className="text-3xl font-bold">City: {kyc?.city}</h1>

        <h1 className="text-3xl font-bold">Pin Code: {kyc?.pincode}</h1>
        <p>Email: {user?.email}</p>
        <p>Username: {user?.username}</p>

        <SignOutButton />
      </div>
    </SessionGuard>
  );
}
