"use server";

import { redirect } from 'next/navigation'
import { handleError } from '../utils';
import { connectToDatabase } from '../database/mongoose';
import Transaction from '../database/models/transaction.model';
import { updateCredits } from './user.actions';
import { MercadoPagoConfig, Preference } from "mercadopago";

const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

const client = new MercadoPagoConfig({
  accessToken: mpAccessToken!
});

export async function createPreference(productDetail: preferenceData) {
  const { title, quantity, price } = productDetail

    let preferenceItem = {
      items: [
        {
          id: 'compracreditos',
          title: title,
          quantity: quantity,
          unit_price: Number(price),
          currency_id: "ARS",
        },
      ],
    };

    const preference = await new Preference(client).create({ body: preferenceItem });
    
    console.log(preference)
    redirect(preference.sandbox_init_point!)
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();

    // Create a new transaction with a buyerId
    const newTransaction = await Transaction.create({
      ...transaction, buyer: transaction.buyerId
    })

    await updateCredits(transaction.buyerId, transaction.credits);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error)
  }
}