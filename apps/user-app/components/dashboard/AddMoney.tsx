"use client";
import { Select, TextInput } from "@repo/ui";
import { useState } from "react";
import { createOnRampTransaction } from "../../app/lib/actions/createOnRampTransaction";

const supportedBank = [
  {
    name: "HDFC Bank",
    redirectURL: "https://netbanking.hdfcbank.com",
  },
  {
    name: "IDFC Bank",
    redirectURL: "https://netbanking.hdfcbank.com",
  },
];

export default function AddMoney() {
  const [redirect, setRedirect] = useState(supportedBank[0]?.redirectURL);
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(supportedBank[0]?.name || "");

  return (
    <div className="flex flex-col gap-10">
      <TextInput
        label="Amount"
        placeholder="Amount"
        onChange={(e) => {
          setAmount(e);
        }}
      />

      <h1>Banks</h1>
      <Select
        onSelect={(value) => {
          setRedirect(
            supportedBank.find((x) => x.name === value)?.redirectURL || "",
          );
          setProvider(supportedBank.find((x) => x.name === value)?.name || "");
        }}
        options={supportedBank.map((x) => ({
          key: x.name,
          value: x.name,
        }))}
      />

      <button
        onClick={async () => {
          await createOnRampTransaction(amount * 100, provider);
          window.location.href = redirect || "";
        }}
      >
        Add money
      </button>
    </div>
  );
}
