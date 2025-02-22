import connectDB from "@/app/lib/mdConnection";
import User from "@/app/models/User";


export async function GET(){
    await connectDB();

    try{
        const user = await User.find({});
        return Response.json(user, {status:200});
    }catch(error){
        return Response.json({message:"Server Error", error:error.message}, {status:400});
    }
}