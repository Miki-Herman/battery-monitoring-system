"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const Login = () => {
    const { data: session, status } = useSession();
    const [hasSynced, setHasSynced] = useState(false);

    useEffect(() => {
        const syncUser = async () => {
            if (session?.user?.id && !hasSynced) {
                try {
                    const res = await fetch("/api/create-or-sync-user", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: session.user.id,
                            email: session.user.email,
                            name: session.user.name,
                            image: session.user.image,
                        }),
                    });

                    if (!res.ok) throw new Error("Sync failed");
                    setHasSynced(true);
                } catch (err) {
                    console.error("Failed to sync user:", err);
                }
            }
        };

        if (status === "authenticated") {
            syncUser();
        }
    }, [session, status, hasSynced]);

    if (status === "loading") {
        return <p>Načítání…</p>;
    }

    if (session) {
        return (
            <Button variant={"contained"} color={"error"} onClick={() => signOut()}>
                Sign out
            </Button>
        );
    }

    return (
        <Button variant={"contained"} color={"success"} onClick={() => signIn("google")}>
            Sign in with Google
        </Button>
    );
};

export default Login;