import mongoose, { Document, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
interface AuthDocument extends Document {
    email: string;
    role: string;
    password: string;
    organizationId: Schema.Types.ObjectId;
}

const authSchema = new Schema<AuthDocument>({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'organization', 'user'],
        default: null,
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'organizations',
        unique: false
    }
}, { timestamps: true });
authSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
const Auth = mongoose.model<AuthDocument>('Auth', authSchema);
export default Auth;
