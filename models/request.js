const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requester: {
        type: String,
        ref: 'User',
        required: true
    },
    post: {
        type: String,
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
});

module.exports = mongoose.model("Request", requestSchema);