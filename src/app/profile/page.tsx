"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('nothing')
    async function logout(){
        try {
            setLoading(true);
            await axios.get("/api/users/logout");
            toast.success("Logout success");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    }
    return(
        <div className="flex flex-col items-center">
            <h1>Profile</h1>
            <hr/>
            <p>Profile page</p>
            <h2 className="bg-orange-500 px-3 py-1 rounded">{data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded"
                onClick={logout}
            >{loading ? "Processing" : "Logout"}</button>
            <button 
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 my-4 rounded"
                onClick={getUserDetails}
            >Get Users Details</button>
        </div>
    )
}
