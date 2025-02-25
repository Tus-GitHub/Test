'use client';

import Link from "next/link";
import { useState } from "react";
import { database, ref, set, push } from "@/app/lib/fbConnection";

export default function Page() {

    const [formData, setFormData] = useState({
        imageUrl: '',
        name: '',
        age: '',
        email: '',
    });

    const [file, setFile] = useState([]);

    const handleImageSubmit = async () => {
        if (!file) {
            console.log("No file selected.");
            return;
        }

        try {
            const imageUrl = await storeImage(file);
            setFormData((prevData) => ({
                ...prevData,
                imageUrl: imageUrl, 
            }));
        } catch (error) {
            console.log("Upload error:", error);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async ()=>{
                try {
                    const imageUrl = reader.result;
                    const imageRef = ref(database, "images");
                    const newImageRef = push(imageRef);
                    await set (newImageRef, {imageUrl});
                    resolve(imageUrl);
                }catch(error){
                    reject(error);
                }
            }
            reader.onerror = (error) => reject(error);
        });
    };

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                console.log("Error from backend");
            } else {
                console.log("User uploaded successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-500 flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col w-48 gap-4 pb-10">
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
                <div className="flex gap-4">
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="border-2 p-3 rounded-xl w-64"
                    />
                    <button type="button" className="bg-slate-900 p-2 rounded-lg m-4 text-white" onClick={handleImageSubmit}>
                        Upload
                    </button>
                </div>
                {formData.imageUrl && (
                    <div className="flex justify-between p-3 border items-center">
                        <img 
                            src={formData.imageUrl} 
                            alt="Uploaded image"
                            className="w-40 h-40 object-cover rounded-lg"
                        />
                    </div>
                )}
                <button type="submit" className="bg-slate-900 p-2 rounded-lg m-4 text-white">
                    Submit
                </button>
            </form>
            <Link href="/">
                <button className="bg-slate-900 p-2 rounded-lg m-4 text-white">Home</button>
            </Link>
        </div>
    );
}
