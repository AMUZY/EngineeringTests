import Nextauth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@app/utils/database";
import User from "@models/user";
import { compare } from "bcrypt";

const handler = Nextauth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: {
          scope: "openid profile email",
        },
      },
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
        };
      },
      token: {
        url: "https://www.linkedin.com/oauth/v2/accessToken",
        async request({ client, params, checks, provider }) {
          const response = await client.callback(
            provider.callbackUrl,
            params,
            checks,
            {
              exchangeBody: {
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET,
              },
            }
          );
          return {
            tokens: response,
          };
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        await connectToDB().catch((error) => {
          throw new Error(error);
        });

        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isPasswordCorrect = await compare(
          credentials?.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signup",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);

      return token;
    },
    async session({ session, token }) {
      if (token) {
        const user = token.user;
        session.user = user;

        return session;
      }

      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      if (profile) {
        try {
          await connectToDB();
          //check if a user exists
          const UserExists = await User.findOne({
            email: profile.email,
          });
          //if not, create a new user
          if (!UserExists) {
            if (profile.iss === "https://accounts.google.com") {
              await User.create({
                email: profile.email,
                username: profile.name.replace(" ", ""),
                image: profile.picture,
                SigninType: "googleAuth",
              });
            } else if (profile.iss === "https://www.linkedin.com") {
              await User.create({
                email: profile.email,
                username: profile.name.replace(" ", ""),
                image: profile.picture,
                SigninType: "linkedinAuth",
              });
            }
          }

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
