"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

function NavBar(){
    const router = useRouter();
    const { user, loading, signOut } = useAuth();

    async function handleSignOut() {
        await signOut();
        router.push("/login");
    }

    return(
    <div>
        <div className=" bg-[#00E0AC] border-b border-blue-900 flex justify-between items-center p-4">
            <Link href="/">
                <Image src="/images/header-logo.png" alt="LOGO" width={32} height={32} className="h-8 w-8 object-cover" priority />
            </Link>
            <nav className="flex gap-4 text-[var(--text-primary)]">
                <ul>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                </ul>
                <ul>
                    <li><Link href="/employees">Employees</Link></li>
                </ul>
                <ul>
                    <li><Link href="/create-employee">Create Employee</Link></li>
                </ul>
                <ul>
                    <li><Link href="/ai-assistant">AI Assistant</Link></li>
                </ul>
            </nav>
            <div>
                {loading ? (
                    <span className="text-sm text-blue-900">Checking session...</span>
                ) : user ? (
                    <button
                    className="border bg-red-500 hover:bg-red-600 text-white cursor-pointer px-4 py-2 rounded-md"
                    onClick={handleSignOut}
                    >Logout</button>
                ) : (
                    <Link
                    href="/login"
                    className="inline-block bg-[var(--text-primary)] hover:bg-blue-800 text-white cursor-pointer px-4 py-2 rounded-md"
                    >Login</Link>
                )}
            </div>
        </div>
    </div>
    )
}

export default NavBar;