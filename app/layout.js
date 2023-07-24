import React from "react";
import "@styles/globals.scss";
import Nav from "@components/Nav";

export const metadata = {
  title: "EngineeringTests",
  description: "Create,store and manage your engineering results",
};

const rootlayout = ({ children }) => {
  return (
    <html >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>
          {" "}
          EngineeringTests - Create,store and manage your engineering results{" "}
        </title>
      </head>
      <body>
        <main>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default rootlayout;
