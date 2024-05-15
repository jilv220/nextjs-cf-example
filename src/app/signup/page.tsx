'use client'

export const runtime = 'edge';

import { useFormState } from "react-dom";
import { signup } from "../actions/session";
import { useRef } from "react";

export default function Page() {
    const ref = useRef<HTMLFormElement>(null);
    const [state, signupAction] = useFormState(signup, {
        error: undefined
    })

    return (
        <>
            <h1>Create an account</h1>
            <form ref={ref} action={(formData) => {
                signupAction(formData);
                ref.current?.reset();
            }}>
                <label htmlFor="username">Username</label>
                <input name="username" id="username" />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <br />
                <button>Continue</button>
            </form>
        </>
    );
}

