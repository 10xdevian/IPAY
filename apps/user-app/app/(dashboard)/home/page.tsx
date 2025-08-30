import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import { authOptions } from "../../lib/authOption";
import SessionGuard from "../../../components/auth/SessionGuard";
import { Card } from "@repo/ui";
import { IndianRupee } from "lucide-react";
import InteractiveButton from "../../../components/ui/InteractiveButton";
import TransactionsList from "../../../components/dashboard/TransactionList";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  let user = null;
  if (session?.user?.id) {
    user = await db.user.findUnique({
      where: { id: Number(session.user.id) }, // ✅ convert to Int
      include: {
        OnRampTransaction: true,
        Balance: true,
        kyc: true,
      },
    });
  }

  return (
    <SessionGuard>
      <div className="px-20 py-6 grid grid-cols-12 gap-5">
        {/* Left  */}

        {/* Card */}

        <div className="col-span-8 ">
          <div className="flex gap-3 flex-col">
            {/* card main balance  */}
            <div className="bg-gradient-to-r from-custom-start via-custom-mid to-custom-end p-4 rounded-xl ">
              <div className="flex justify-between ">
                <div className="rounded-xl font-bold bg-blue-600 justify-center items-center flex text-white  p-2">
                  <IndianRupee />
                </div>

                <div className=" text-white">
                  <h1>Wallet Balance</h1>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col gap-2">
                <h1 className="text-gray-300 pr-[5rem] text-md ">
                  Personal account
                </h1>
                <div className="text-white text-4xl font-bold ">
                  {user?.Balance.map((b) => (
                    <p key={b.id}>
                      {" "}
                      ₹{" "}
                      {(b.amount / 100).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  ))}
                </div>

                <div className="flex gap-3 text-white items-center justify-center ">
                  <h1>send</h1>
                  <h1>re</h1>
                  <h1>add</h1>
                </div>
              </div>

              <div className=" text-gray-300 flex justify-between ">
                <h1>Locked Balance</h1>
                {user?.Balance.map((b: any) => (
                  <p key={b.id}>
                    ₹{" "}
                    {(b.locked / 100).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </p>
                ))}
              </div>
            </div>

            {/* Transaction */}
            <div title="Transaction" className="">
              <div className="flex justify-between font-bold mt-6">
                <h1 className="mb-2 text-3xl ">Transaction</h1>
                <InteractiveButton
                  href="/transactions"
                  variant="link"
                  className="text-xl capitalize"
                >
                  see all
                </InteractiveButton>
              </div>
              <TransactionsList transaction={user?.OnRampTransaction || []} limit={4} />
            </div>
          </div>
        </div>
        {/* Right */}

        <div className="col-span-4">
          <Card className="" title="">
            <h1>Quick transaction</h1>
          </Card>

          <Card className="" title="">
            <h1>Quick transaction</h1>
          </Card>
        </div>
      </div>
    </SessionGuard>
  );
}
