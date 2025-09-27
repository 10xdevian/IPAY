"use client";
import { TextInput } from "@repo/ui";
import { useState } from "react";
import { P2PTransfer } from "../../app/lib/actions/p2pTransfer";

export default function SendMoney() {
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState("");

  return (
    <div className="flex flex-col gap-10">
      <TextInput
        value={amount}
        label="Amount"
        placeholder="Amount"
        onChange={(e) => {
          setAmount(Number(e));
        }}
      />

      <TextInput
        value={number}
        label="Phone Number"
        placeholder="Phone Number"
        onChange={(e) => {
          setNumber(e);
        }}
      />

      <button
        onClick={async () => {
          await P2PTransfer(amount * 100, number);
          setAmount(0);
          setNumber("");
        }}
      >
        Add money
      </button>
    </div>
  );
}
