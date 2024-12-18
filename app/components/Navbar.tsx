import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

const Navbar = async () => {

    const session = await getServerSession(authOptions);

    return (
        <div className="w-full px-4 py-8 bg-gray-300 flex flex-row items-center gap-4">
            <Link href="/">Home</Link>
            <Link href="/admin/dashboard">Dashboard</Link>

            {session && session.user?.email ? (
                <>
                    <Link href="/auth/signout">Sign Out</Link>
                    <p>
                        Signed as {session.user?.email}
                    </p>
                </>
            ) : (
                <>
                    <Link href="/auth/signin">Sign In</Link>
                    <Link href="/auth/signup">Sign Up</Link>
                </>
            )}
        </div>
    )
}

export default Navbar;