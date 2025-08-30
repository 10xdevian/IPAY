import React from "react";

function TransactionsList({
  transaction,
  limit,
}: {
  transaction: any;
  limit?: number;
}) {
  const txns = limit ? transaction.slice(0, limit) : transaction;

  return (
    <div className="space-y-2">
      {txns.map((txn: any) => (
        <div
          key={txn.id}
          className="flex justify-between p-6 hover:bg-gray-100 rounded-3xl"
        >
          <div className="">{txn.provider}</div>

          <div>
            ₹{" "}
            {(txn.amount / 100).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionsList;
