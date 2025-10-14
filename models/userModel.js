import mongoose from "mongoose"


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true
        },
        email:{
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
                 'Please enter a valid email address']
        },
        password:{
            type: String,
            required: [true, 'Please enter your password'],
            minLength: [6, 'Password must be at least 6 characters']
        }
    }, 
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

export default User