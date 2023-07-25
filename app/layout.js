import React from "react";
import "@styles/globals.scss";
import Head from "next/head";


export const metadata = {
  title: "EngineeringTests",
  description: "Create,store and manage your engineering results",
};

// const observer = new IntersectionObserver(()=>{

// })
// observer.observe()

const rootlayout = ({ children }) => {
  return (
    <html >
      <Head>
        <title>
            EngineeringTests - Create,store and manage your engineering results
        </title>
        <meta
          name="description"
          content="Create,store and manage your engineering results"
          key="desc"
        />
      </Head>
      <head>
        <meta property="og:site_name" content="EngineeringTests" />
        <meta property="og:title" content="EngineeringTests" />
        <meta
          property="og:description"
          content="Create,store and manage your engineering results"
        />
        <meta property="og:url" content="https://engineeringtests.netlify.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/meta_image.jpg" />
        <meta property="og:image:type"  content="image/jpeg" />

        <meta property="og:image:width" content="296" />
        <meta property="og:image:height" content="296" />
        {/* <meta name="twitter:card" content="summary" /> */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>
          EngineeringTests - Create,store and manage your engineering results
        </title>
      </head>
      <body>
        <main> 
          {children}
        </main>
      </body>
    </html>
  );
};

export default rootlayout;
