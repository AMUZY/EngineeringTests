'use client'
import React from "react";
import "@styles/globals.scss";
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EngineeringTests",
  description: "Create,store and manage your engineering results",
};


const rootlayout = ({ children }) => {
  return (
    <html lang="en" className="w-full h-full">
      <head>
        <meta property="og:site_name" content="EngineeringTests" />
        <meta property="og:title" content="EngineeringTests" />
        <meta
          property="og:description"
          content="Create, store and manage your engineering test results , tensile, hardness , impact , flexural , FTIR tests e.t.c "
        />
        <meta property="og:url" content="https://engineering-tests.vercel.app/" />
        <meta property="og:type" content="website" />
        {/* OTHER SOCIAL MEDIA IMAGE (FACEBOOK) */}
        <meta property="og:image:secure_url" content="https://engineering-tests.vercel.app/assets/images/meta_image.jpg" />
        <meta property="og:image:type"  content="image/jpg" />
        {/* LINKEDIN */}
        <meta property="og:image" content="https://engineering-tests.vercel.app/assets/images/meta_image.jpg" />
        {/* <meta name="twitter:card" content="summary" /> */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* TWITTER */}
        <meta name="twitter:card" content="https://engineering-tests.vercel.app/assets/images/meta_image.jpg" />
        <meta name="twitter:site" content="https://engineering-tests.vercel.app/" />
        <meta name="twitter:title" content="EngineeringTests" />
        <meta name="twitter:description" content="Create, store and manage your engineering test results , tensile, hardness , impact , flexural , FTIR tests e.t.c " />
        <meta name="twitter:image:secure_url" content="https://engineering-tests.vercel.app/assets/images/meta_image.jpg" />


        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>
          EngineeringTests - Create, store and manage your engineering test results , tensile, hardness , impact , flexural , FTIR tests e.t.c 
        </title>
      </head>
      <body className="w-full h-full">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
};

export default rootlayout;
