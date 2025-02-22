'use client';

export default function Detail({detail}){
    return(
        <div className="bg-slate-500 m-4 h-24 w-48 text-white">
            <p>Name: {detail.name}</p>
            <p>Age: {detail.age}</p>
            <p>Email: {detail.email}</p>
        </div>
    )
}