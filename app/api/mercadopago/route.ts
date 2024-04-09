import { handleError } from "@/lib/utils";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

const client = new MercadoPagoConfig({
  accessToken: mpAccessToken!
});

export const POST = async (req: Request) => {
  const { id, title, quantity, price } = await req.json();

  try {
    let preferenceItem = {
      items: [
        {
          id: id,
          title: title,
          quantity: quantity,
          unit_price: price,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:3000/mercadopago/feedback",
        failure: "http://localhost:3000/mercadopago/feedback",
        pending: "http://localhost:3000/mercadopago/feedback",
      },
      auto_return: "approved",
    };

    const preference = await new Preference(client).create({ body: preferenceItem });


    return NextResponse.json(preference.sandbox_init_point);

  } catch (error) {
    handleError(error);
  }
};
