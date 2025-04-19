export const metadata = {
    title: "Data Dashboard",
    description: "Data Dashboard",
};

import Header from "@/app/components/header";
import Dashboard from "@/app/dashboard/dashboard";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen bg-black-100">
            <Header />
            <Dashboard />
        </main>
    );
}
