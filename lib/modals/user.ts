import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        lastname: {type: String, required: true},
        password: {type: String, required: true},
    },
    {
        timestamps: true,
    });

    const User = models.User || model('User', UserSchema);
    export { User };
    export default User;