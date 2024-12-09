'use client';

import React, { useState } from "react";
import { signUp } from "../actions/users/signUp";

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        setMessage("Signing up...");
        const message = await signUp(email, password);
        setMessage(message);
    }

    return (
        <div className="flex flex-col gap-4p-4">
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button onClick={handleSubmit}>Submit</button>

            <p>{message}</p>
        </div>
    )
};

export default SignUpForm;