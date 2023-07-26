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
        <meta property="og:url" content="https://engineeringtests.netlify.app/" />
        <meta property="og:type" content="website" />
        {/* WHATSAPP IMAGE */}
        <meta property="og:image:secure_url" itemprop="image" content="https://engineeringtests.netlify.app/assets/images/meta_image.png" />
        {/* OTHER SOCIAL MEDIA IMAGE (FACEBOOK) */}
        <meta property="og:image:secure_url" content="https://engineeringtests.netlify.app/assets/images/ET_trans.png" />
        <meta property="og:image:type"  content="image/png" />

        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        {/* <meta name="twitter:card" content="summary" /> */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* TWITTER */}
        <meta name="twitter:card" content="https://engineeringtests.netlify.app/assets/images/ET_trans.png" />
        <meta name="twitter:site" content="https://engineeringtests.netlify.app/" />
        <meta name="twitter:title" content="EngineeringTests" />
        <meta name="twitter:description" content="Create,store and manage your engineering results" />
        <meta name="twitter:image:secure_url" content="https://engineeringtests.netlify.app/assets/images/meta_image.png" />
        {/* FACEBOOK */}


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
