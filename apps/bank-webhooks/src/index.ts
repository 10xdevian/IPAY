import express from "express";
import db from "@repo/db/client";

const app = express();
//  add zod
//  add types

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  console.log("Incoming Webhook Body:", req.body);
  const paymentInfo = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInfo.userId,
        },
        data: {
          amount: {
            increment: paymentInfo.amount,
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.status(200).json({
      msg: "captured",
    });
  } catch (error) {
    console.error("Webhook Error:", error),
      res.status(411).json({
        message: "Error while Processing webHooks",
      });
  }
});

app.listen(8080, () => {
  console.log(`Server is running on port http://localhost:8080/hdfcWebhook`);
});
