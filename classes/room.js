
const { Schema, model } = require('mongoose');

const RoomSchema = Schema({

    name: {
        type: String,
        require: true
    },
    create: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    online: {
        type: Boolean,
        default: false 
    },
    photo: {
        type: String,
        default: false 
    },
    email: {
        type: String,
        require: true 
    },
    verified: {
        type: Boolean,
        default: false 
    },
    members: {
        type: Number,
        require: true 
    },
    amount: {
        type: Number,
        require: true 
    }}, {
        timestamps: true
    }
    );

RoomSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Room', RoomSchema);