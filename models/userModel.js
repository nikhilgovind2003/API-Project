import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    issuedBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required:false
    },
    issuedDate: {
        type: String,
        required: false,
    },
    returnDate: {
        type: String,
        required: false,
    },
    subsrciptionType: {
        type: String,
        required: true
    },
    subsrciptionDate: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const userModel = mongoose.model("User", userSchema)
export default userModel;