const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = mongoose.model("Request", requestSchema);