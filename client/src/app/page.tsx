"use client";

import { useSession } from "next-auth/react";

import Dashboard from "@/app/dashboard/Dashboard";
import Login from "components/Login";

import scss from "@/app/components/Layout/Layout.module.scss";
import React from "react";

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <main className={scss.main}>
      {session && <Dashboard />}
      {!session && <Login />}
    </main>
  );
};

export default Home;
