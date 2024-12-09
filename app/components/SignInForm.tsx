'use client';

import React, { useEffect, useState } from "react";
// import { signUp } from "../actions/users/signUp";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
    const router = useRouter();
    const { status } = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        setMessage("Signing in...");

        try {
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
                // callbackUrl: '/',
            });

            if (!signInResponse || signInResponse.ok !== true) {
                setMessage("Login gagal");
            } else {
                router.refresh();
            }
        } catch(err) {
            console.log(err);
        }

        setMessage(message);
    };

    useEffect(() => {
        if (status === 'authenticated') {
            router.refresh();
            router.push('/');
        }
    }, [status]);

    return (
        <div className="flex flex-col gap-4 bg-gray-400 p-4">
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button onClick={handleSubmit}>Submit</button>

            <p>{message}</p>
        </div>
    )
};

export default SignInForm;