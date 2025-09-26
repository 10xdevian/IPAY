import SessionGuard from "../../../components/auth/SessionGuard";
import { Card } from "@repo/ui";
import InteractiveButton from "../../../components/ui/InteractiveButton";
import TransactionsList from "../../../components/dashboard/TransactionList";
import { getUserWithDetails } from "../../lib/userService";
// import { Field } from "@repo/types";
// import ClientFormWrapper from "../../../components/dashboard/ClientFormWrapper";

import SendMoney from "../../../components/dashboard/SendMoney";
export default async function DashboardPage() {
  // const fields: Field[] = [
  //   {
  //     name: "Banks",
  //     type: "select",
  //     label: "Bank name",
  //     required: true,
  //     className: "mb-10 p-4 border border-gray-300",

  //     options: [
  //       { label: "HDFC Bank", value: "hdfc" },
  //       { label: "ICICI Bank", value: "icici" },
  //       { label: "Axis Bank", value: "axis" },
  //       { label: "XYZ Bank", value: "axis" },
  //     ],
  //     wrapperClassName: "mt-10 mb-10",
  //   },
  //   {
  //     name: "amount",
  //     type: "text",
  //     label: "Amount",
  //     required: true,
  //     className: "p-4 border border-gray-300 mb-10",
  //   },
  // ];

  const user = await getUserWithDetails();

  if (!user) {
    return <div>Please log in</div>;
  }

  const { walletBalance, OnRampTransaction } = user;

  return (
    <SessionGuard>
      <div className="px-20 py-6 grid grid-cols-12 gap-5">
        <div className="col-span-8 mt-20 pr-10">
          <div className="">
            <h1>Add money</h1>

            <div className="">
              {/*<ClientFormWrapper submitText="Add money" fields={fields} />*/}

              <SendMoney />
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <Card className="" title="">
            <h1>Quick transaction</h1>

            <div className="flex items-center justify-center flex-col gap-2">
              <h1 className="text-black pr-[5rem] text-md ">
                Personal account
              </h1>
              <div className="">
                <div className="text-black text-4xl font-bold ">
                  {(walletBalance.totalBalance / 100).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>

            <div className=" text-black flex justify-between ">
              <h1>Locked Balance</h1>
              {(walletBalance.lockedBalance / 100).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>

            <div className="text-black text-4xl font-bold ">
              <h1>Account Balance</h1>
              {(walletBalance.usableBalance / 100).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </Card>

          <Card className="" title="">
            <div title="Transaction" className="">
              <div className="flex justify-between font-bold mt-6">
                <h1 className="mb-2 text-3xl ">Recent Transaction</h1>
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
          </Card>
        </div>
      </div>
    </SessionGuard>
  );
}
