"use client";

import { useSession } from "next-auth/react";

import Combobox from "@/app/components/ComboBox";
import Login from "@/app/components/Login";

import scss from "@/app/components/Layout/Layout.module.scss";
import React from "react";


const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <main className={scss.main}>
      {session && <Combobox session={session} />}
      {!session && <Login />}
    </main>
  );
};

export default Home;
