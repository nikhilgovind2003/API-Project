import mongoose, { mongo } from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genere: {
        type: String,
        required: true
    },
   
    price: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const bookModel = mongoose.model("Book", bookSchema)
export default bookModel;