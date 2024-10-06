import axios from "axios";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      //   GitHubProvider({
      //     profile(profile) {
      //       console.log("Profile GitHub: ", profile);

      //       let userRole =
      //         profile?.email === "mwanikic314@gmail.com"
      //           ? "admin"
      //           : "Github User";

      //       return {
      //         ...profile,
      //         role: userRole,
      //         favoriteProduct: [],
      //       };
      //     },
      //     clientId: process.env.GITHUB_ID,
      //     clientSecret: process.env.GITHUB_Secret,
      //   }),
      //   GoogleProvider({
      //     profile(profile) {
      //       console.log("Profile Google: ", profile);

      //       let userRole =
      //         profile?.email === "mwanikic314@gmail.com" ? "admin" : "Google";

      //       return {
      //         ...profile,
      //         id: profile.sub,
      //         role: userRole,
      //         favoriteProduct: [],
      //       };
      //     },
      //     clientId: process.env.GOOGLE_ID,
      //     clientSecret: process.env.GOOGLE_Secret,
      //   }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email: ",
            type: "email",
            placeholder: "Enter email...",
          },
          password: {
            label: "Password: ",
            type: "password",
            placeholder: "Enter password...",
          },
        },

        async authorize(credentials) {
          try {
            const { email, password } = credentials;
            console.log(email, password);
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_USERS_URL}/find`,
              {
                params: { email },
              }
            );

            const foundUser = response.data;

            if (foundUser) {
              console.log("User exists");
              const match = await bcrypt.compare(password, foundUser.password);

              if (match) {
                console.log("Verified");
                return foundUser;
              } else {
                console.log("wrong password");
              }
            } else {
              console.log("Could not find user");
            }
          } catch (error) {
            console.log(error);
          }
          //if both try and catch do not happen, make sure to return null
          console.log("nothing happened");
          return null;
        },
      }),
    ],

    callbacks: {
      async jwt({ token, user }) {
        if (user) token.role = user.role;
        return token;
      },
      async session({ session, token }) {
        if (session?.user) session.user.role = token.role;
        return session;
      },
    },
  });
}
