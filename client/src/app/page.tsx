"use client";

import { useSession } from "next-auth/react";

import Dashboard from "@/app/dashboard/dashboard";
import Login from "@/app/components/login";
import SideMenu from "@/app/components/sideMenu";

import scss from "./Home.module.scss";
import React from "react";

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <main className={scss.main}>
      {session && (
        <>
          <Dashboard />
          <SideMenu />
        </>
      )}
      <Login />
    </main>
  );
};

export default Home;
