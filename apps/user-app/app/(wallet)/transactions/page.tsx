import React from "react";
import { getUserWithDetails } from "../../lib/userService";
import TransactionsList from "../../../components/dashboard/TransactionList";

async function page() {
  const user = await getUserWithDetails();

  if (!user) {
    return <div>Loading....</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-black font-extrabold text-3xl">Transaction</h1>
      <div className="px-30 mt-3">
        <TransactionsList transaction={user?.OnRampTransaction || []} />
      </div>
    </div>
  );
}

export default page;
