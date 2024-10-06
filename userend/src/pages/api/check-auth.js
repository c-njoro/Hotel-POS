import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    res.status(200).json({ user: { ...session.user, authenticated: true } });
  } else {
    res.status(200).json({ user: { authenticated: false } });
  }
}
