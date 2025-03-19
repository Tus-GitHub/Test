'use client';
// This is only for practice
import Link from "next/link";
import { useEffect, useState } from "react";
import Detail from "./component/Detail";

export default function Home() {

  const[userDetail, setUserDetail] = useState([]);

  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data`);
        const data = await res.json();
        setUserDetail(data);
      }catch(error){
        console.log(error);
      }
    }
    fetchUser();
  },[]);

  return (
    <div className="min-h-screen bg-slate-800 text-white flex flex-col items-center">
      <p className="m-10">Hello</p>
      {userDetail && userDetail.length > 0 &&(
          <div className="grid grid-cols-4">
            {userDetail.map((detail)=>(
              <Detail key={detail._id} detail={detail}/>
            ))}
          </div>
      )}
      <Link href="/upload" ><button className="bg-slate-900 p-2 rounded-lg m-4">Upload</button></Link>
    </div>
  );
}
