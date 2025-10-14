import mongoose from "mongoose";

const toDOSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
    trim: true,
    maxLength: [100, "Title cannot be more than 100 characters"],
  },
  description:{
    type: String, 
    trim: true,
    maxLength: [500, 'Description cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date']
  }
},
    {timestamps:true}
);

// Export the model
const ToDo = mongoose.model("ToDo", toDOSchema);
export default ToDo;
