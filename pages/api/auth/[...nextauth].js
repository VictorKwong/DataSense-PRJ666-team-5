// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        // Specify the scopes you need
        params: {
          scope:
            "openid profile email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
  ],
  debug: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt(params) {
      console.log("jwt params", params);
      const { account, token, user, profile, trigger, session } = params;
      /**
       * account is like:
       * {
    provider: 'google',
    type: 'oauth',
    providerAccountId: '102173608886217431366',
    access_token: 'xxx.xxx',
    expires_at: 1727754252,
    scope: 'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    token_type: 'Bearer',
    id_token: 'aaaxxxx', Optional for server to decode and validate email, ...
  },
       */
      //   if (account) {
      //     const response = await fetch(
      //       "https://your-backend-api.com/get-or-create-user?",
      //       {
      //         method: "GET",
      //         headers: {
      //           Authorization: `Bearer ${account.access_token}`,
      //         },
      //       }
      //     );

      //     const userAccount = await response.json();
      //     // Attach the user account data to the token
      //     token.userAccount = userAccount; // user account from db
      //   }

      //   if (typeof window !== "undefined") {
      //     console.log("###storing to localstorage!!!!", account.access_token);
      //     localStorage.setItem("access_token", account.access_token); // Store in local storage
      //   }

      console.log("### jwt returning token", token);
      return token;
    },
    async session({ session, token, user, newSession, trigger }) {
      // Attach user account data to session
      console.log("### session", { session, token, user, newSession, trigger });
      session.userAccount = token.userAccount; // Add user account data to the session
      return session;
    },
  },
});
