'use client';

export default function Detail({detail}){
    return(
        <div className="bg-slate-500 m-4 h-24 w-48 text-white">
            {detail.imageUrl && (
                <img 
                    src={detail.imageUrl}
                    alt="user Image"
                    className="w-10 h-10 object-cover"

                />
            )}
            <p>Name: {detail.name}</p>
            <p>Age: {detail.age}</p>
            <p>Email: {detail.email}</p>
        </div>
    )
}