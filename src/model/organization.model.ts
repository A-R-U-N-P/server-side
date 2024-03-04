import mongoose, { Document, Schema } from 'mongoose';

interface OrganizationDocument extends Document {
    name: string;
    address: string;
    contactNo: number;
    email: string;
}

const organizationSchema = new Schema<OrganizationDocument>({
    name: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
        minlength: 10
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const Organization = mongoose.model<OrganizationDocument>('organizations', organizationSchema);

export default Organization;
