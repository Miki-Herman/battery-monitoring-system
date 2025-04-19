"use client";

import {useSession} from "next-auth/react";

import Dashboard from "@/app/dashboard/dashboard";
import Login from "@/app/components/login";

import scss from "./Home.module.scss";
import React from "react";

const Home: React.FC  = () => {
    const {data : session} = useSession();

    return (
        <main className={scss.main}>
            {
                session && (
                    <>
                        <Dashboard />
                    </>
                )
            }
            <Login />
        </main>
    );
}

export default Home;
