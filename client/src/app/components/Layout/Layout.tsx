"use client";
import SideMenu from "../SideMenu";
import scss from "./Layout.module.scss";
import { useSession } from "next-auth/react";
import React from "react";
import Head from "next/head";

const Layout = (props: any) => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Battery Monitoring System</title>
        <meta name="description" content="BMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
          className={scss.layout}
          style={{ padding: session ? "0 24px 0 80px": 0}}
      >
        {session && <SideMenu />}
        {props.children}
      </main>
    </>
  );
};

export default Layout;