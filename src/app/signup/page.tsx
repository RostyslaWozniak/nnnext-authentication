"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignPage(){
    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    async function onSignup(){
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error : any) {
            console.log("Signup failed", error.message)
            toast.error(error.massage)
        } finally{
            setLoading(false)
        }
    }
    
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user])
    return(
    <div className="flex flex-col items-center">
        <h1 className="text-center text-2xl">{loading ? "Processing" : "Signup"}</h1>
        <label className="w-[400px] flex justify-between items-center border-white">
            username
            <input 
                className="p-1 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-black"
                type="text" 
                value={user.username}
                onChange={e => setUser({...user, username: e.target.value})}
                placeholder="username"
            />
        </label>
        <label className="w-[400px] flex justify-between items-center border-white">
            email
            <input 
                className="p-1 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-black"
                type="text" 
                value={user.email}
                onChange={e => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
        </label>
        <label className="w-[400px] flex justify-between items-center border-white">
            password
            <input 
                className="p-1 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-black"
                type="password" 
                value={user.password}
                onChange={e => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
        </label>
        <button 
            className="px-5 py-1 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600"
            onClick={onSignup}
            >
            { buttonDisabled ? "No singup" : "Signup" }
        </button>
        <Link href="/login" className="italic">Visit login page</Link>
    </div>
    )
}