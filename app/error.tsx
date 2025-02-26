"use client";
// pages/_error.tsx

import { NextPageContext } from "next";
import Link from "next/link";
import React from "react";

interface ErrorProps {
  statusCode: number;
}

const ErrorPage: React.FC<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="px-2 text-center">
      <h1>{statusCode ? `Error ${statusCode}` : "An error occurred"}</h1>
      <p>
        {statusCode === 404
          ? "The page you are looking for could not be found."
          : "An unexpected error has occurred."}
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
