import mercadopago from "mercadopago";

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  });

  const { products } = req.body;

  const items = products.map((product) => ({
    title: product.title,
    description: product.description,
    currency_id: product.currency_id,
    unit_price: product.unit_price,
    quantity: product.quantity,
    picture_url: product.picture_url,
  }));

  const result = await mercadopago.preferences.create({
    items,
    back_urls: {
      success: "http://localhost:5173/success",
      failure: "http://localhost:5173/store",
    },
    payment_methods: {
      excluded_payment_types: [
        {
          id: "ticket",
        },
      ],
    },
    notification_url:
      "https://0510-2800-a4-277d-3e00-7068-2b7-262a-7f0c.ngrok-free.app/webhook",
  });

  const { init_point } = result.body;
  console.log(init_point);
  res.json(init_point);
};

export const receiveWebhook = (req, res) => {
  console.log(req.query);
  res.send("webhook");
};
