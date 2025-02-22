'use client';

import Link from "next/link";
import { useState } from "react";

export default function Page(){

    const[formData, setFormData] = useState({});

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`,{
                method :"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success === false){
                console.log("Error from backend");
            } else{
                console.log("User uploaded");
            }
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="min-h-screen flex justify-center items-center bg-slate-500 flex-col">
            <form onSubmit={handleSubmit} className=" flex flex-col w-48 gap-4 pb-10">
                <input 
                    type="text"
                    onChange={handleChange}
                    className="border-2 p-2 rounded"
                    id="name"
                    placeholder="Name"
                />
                <input 
                    type="number"
                    onChange={handleChange}
                    className="border-2 p-2 rounded"
                    id="age"
                    placeholder="Age"
                />
                <input 
                    type="text"
                    onChange={handleChange}
                    className="border-2 p-2 rounded"
                    id="email"
                    placeholder="Email"
                />
                <button type="submit" className="bg-slate-400 p-2 hover:">Submit</button>
            </form>
            <Link href="/" ><button className="bg-slate-900 p-2 rounded-lg m-4 text-white">Home</button></Link>
        </div>
    )
}