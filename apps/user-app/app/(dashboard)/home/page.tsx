import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import { authOptions } from "../../lib/authOption";
import SessionGuard from "../../../components/auth/SessionGuard";
import { Card } from "@repo/ui";
import { IndianRupee } from "lucide-react";
import InteractiveButton from "../../../components/ui/InteractiveButton";
import TransactionsList from "../../../components/dashboard/TransactionList";
import { getUserWithDetails } from "../../lib/userService";
export default async function DashboardPage() {
  const user = await getUserWithDetails();

  if (!user) {
    return <div>Please log in</div>;
  }

  const { walletBalance, OnRampTransaction } = user;

  return (
    <SessionGuard>
      <div className="px-20 py-6 grid grid-cols-12 gap-5">
        {/* Left  */}

        {/* Card */}

        <div className="col-span-8 ">
          <div className="">
            <div className="flex gap-3 flex-col">
              {/* card main balance /* locked and total  */}

              <div className="flex gap-4 items-center">
                {/* div left  */}

                <div className="bg-gradient-to-r from-custom-start via-custom-mid to-custom-end p-7 rounded-xl w-[20rem] max-h-[rem] flex flex-col gap-4">
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
                    <div className="">
                      <div className="text-white text-4xl font-bold ">
                        {(walletBalance.totalBalance / 100).toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" text-gray-300 flex justify-between ">
                    <h1>Locked Balance</h1>
                    {(walletBalance.lockedBalance / 100).toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </div>
                </div>

                {/* div right */}
                <div className="max-w-[20rem] max-h-[10rem]">
                  <div className="text-black text-4xl font-bold ">
                    <h1>Account Balance</h1>
                    {(walletBalance.usableBalance / 100).toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </div>

                  <div className="flex gap-3 text-black items-center justify-center ">
                    <h1>send</h1>
                    <h1>re</h1>
                    <h1>add</h1>
                  </div>
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
                <TransactionsList
                  transaction={OnRampTransaction || []}
                  limit={4}
                />
              </div>
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
