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
            EngineeringTests - Create, store and manage your engineering test results
        </title>
        <meta
          name="description"
          content="Create, store and manage your test engineering results , tensile, hardness , impact , flexural , FTIR tests e.t.c "
          key="desc"
        />
      </Head>
      <head>
        <meta property="og:site_name" content="EngineeringTests" />
        <meta property="og:title" content="EngineeringTests" />
        <meta
          property="og:description"
          content="Create, store and manage your test engineering results , tensile, hardness , impact , flexural , FTIR tests e.t.c "
        />
        <meta property="og:url" content="https://engineeringtests.netlify.app/" />
        <meta property="og:type" content="website" />
        {/* OTHER SOCIAL MEDIA IMAGE (FACEBOOK) */}
        <meta property="og:image:secure_url" content="https://engineeringtests.netlify.app/assets/images/meta_image.png" />
        <meta property="og:image:type"  content="image/png" />
        {/* LINKEDIN */}
        <meta property="og:image" content="https://engineeringtests.netlify.app/assets/images/meta_image.png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        {/* <meta name="twitter:card" content="summary" /> */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* TWITTER */}
        <meta name="twitter:card" content="https://engineeringtests.netlify.app/assets/images/meta_image.png" />
        <meta name="twitter:site" content="https://engineeringtests.netlify.app/" />
        <meta name="twitter:title" content="EngineeringTests" />
        <meta name="twitter:description" content="Create, store and manage your test engineering results , tensile, hardness , impact , flexural , FTIR tests e.t.c " />
        <meta name="twitter:image:secure_url" content="https://engineeringtests.netlify.app/assets/images/meta_image.png" />


        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>
          EngineeringTests - Create, store and manage your test engineering results , tensile, hardness , impact , flexural , FTIR tests e.t.c 
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
