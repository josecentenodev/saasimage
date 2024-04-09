"use client";

import { FormEvent } from "react";
import { createPreference } from "@/lib/actions/transaction.actions";

import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
}: {
  plan: string;
  amount: number;
  credits: number;
}) => {


  const onCheckout = (e: FormEvent) => {
    e.preventDefault();
    const transaction = {
      title: plan,
      quantity: 1,
      credits: credits,
      price: amount,
    };

    createPreference(transaction);
  };

  return (
    <>
      <form onSubmit={onCheckout}>
        <section>
          <Button
            type="submit"
            role="link"
            className="w-full rounded-full bg-purple-gradient bg-cover"
          >
            Buy Credit
          </Button>
        </section>
      </form>
    </>
  );
};

export default Checkout;
