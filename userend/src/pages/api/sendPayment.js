import IntaSend from "intasend-node";

export default async function handler(req, res) {
  const { amount, name, email, redirect } = req.body;
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!amount || !email || !redirect) {
    return res
      .status(400)
      .json({ message: "All body requirements were not provided on request" });
  }

  console.log("Received email type:", typeof req.body.email);
  console.log("Received email value:", req.body.email);

  try {
    let intasend = new IntaSend(
      process.env.INSTA_PUBLISHABLE_KEY,
      process.env.INSTA_SECRET_API,
      true // Set to false in production
    );

    let collection = intasend.collection();
    const response = await collection.charge({
      email: email.trim(),
      host: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
      amount: amount,
      currency: "KES",
      api_ref: "test",
      redirect_url: redirect,
    });

    res
      .status(200)
      .json({ checkout_url: response.url, wholeResponse: response });
  } catch (error) {
    console.error("Charge error:", error.toString("utf8"));
    res
      .status(500)
      .json({ message: "Payment failed", error: error.toString("utf-8") });
  }
}
