import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    organizationId: Schema.Types.ObjectId;
    contactNo: number;
    role: string;
}

const userSchema = new Schema<UserDocument>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
        minlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin', 'organization', 'user'],
        default: null,
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'organizations', // Reference to the Organization model
        required: true,
        unique: false
    }
}, { timestamps: true });

const User = mongoose.model<UserDocument>('users', userSchema);

export default User;
