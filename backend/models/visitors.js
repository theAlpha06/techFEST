import mongoose, {Schema} from 'mongoose';

const visitorSchema = new Schema({
    token: {
        type: String,
        required: true
    }, 
});

const visitorToken = new mongoose.model('visitorToken', visitorSchema);

export default visitorToken;