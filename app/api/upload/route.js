import connectDB from "@/app/lib/mdConnection";
import User from "@/app/models/User";


export async function POST(req){
    await connectDB();
    try{
        const {name, age, email, imageUrl} = await req.json();
        if (!name || !age || !email || !imageUrl) {
            return Response.json({ message: "Fill every detail" }, { status: 400 });
        }
        const person = new User({name, age, email, imageUrl});
        await person.save();
        return Response.json({message:"User uploaded succesfully"}, {status:201});
    }catch(error){
        return Response.json({ message: "Server error", error: error.message }, { status: 500 });    
    }
}