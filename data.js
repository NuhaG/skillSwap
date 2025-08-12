require("dotenv").config();
const mongoose = require("mongoose");
const Share = require("./models/share.js");
const Request = require("./models/request.js");
const connectDB = require("./db/connect.js");

const shares = [
  {
    skillOffered: "Guitar",
    skillNeeded: "French",
    description: "Can teach beginner guitar, want to learn conversational French.",
    sharedBy: "Alice Johnson",
    createdAt: new Date()
  },
  {
    skillOffered: "Python Programming",
    skillNeeded: "Cooking",
    description: "Will help with Python basics, looking for cooking tips.",
    sharedBy: "Bob Smith",
    createdAt: new Date()
  },
  {
    skillOffered: "Photography",
    skillNeeded: "Spanish",
    description: "Can teach basics of DSLR photography, want to learn Spanish.",
    sharedBy: "Clara Martinez",
    createdAt: new Date()
  },
  {
    skillOffered: "Web Design",
    skillNeeded: "Public Speaking",
    description: "Can help with HTML/CSS, want to improve public speaking.",
    sharedBy: "David Lee",
    createdAt: new Date()
  },
  {
    skillOffered: "Chess",
    skillNeeded: "Yoga",
    description: "Can teach chess strategies, want to learn yoga.",
    sharedBy: "Emily Carter",
    createdAt: new Date()
  },
  {
    skillOffered: "Cooking",
    skillNeeded: "JavaScript",
    description: "Can teach Italian cooking, want to learn JavaScript.",
    sharedBy: "Frank Russo",
    createdAt: new Date()
  },
  {
    skillOffered: "Painting",
    skillNeeded: "German",
    description: "Can teach watercolor painting, want to learn German.",
    sharedBy: "Grace Müller",
    createdAt: new Date()
  },
  {
    skillOffered: "Gardening",
    skillNeeded: "Excel",
    description: "Can help with urban gardening, want to learn Excel.",
    sharedBy: "Helen Green",
    createdAt: new Date()
  },
  {
    skillOffered: "Singing",
    skillNeeded: "Photography",
    description: "Can teach singing techniques, want to learn photography.",
    sharedBy: "Ian Brown",
    createdAt: new Date()
  },
  {
    skillOffered: "Swimming",
    skillNeeded: "Python Programming",
    description: "Can teach swimming, want to learn Python.",
    sharedBy: "Julia Kim",
    createdAt: new Date()
  }
];

const requests = [
  {
    requester: "Charlie Lee",
    post: "Guitar",
    message: "Interested in learning guitar from Alice.",
    status: "pending",
    createdAt: new Date()
  },
  {
    requester: "Dana White",
    post: "Python Programming",
    message: "Would like to swap cooking lessons for Python help.",
    status: "pending",
    createdAt: new Date()
  },
  {
    requester: "Emily Carter",
    post: "Yoga",
    message: "Looking for yoga lessons in exchange for chess coaching.",
    status: "pending",
    createdAt: new Date()
  },
  {
    requester: "Frank Russo",
    post: "JavaScript",
    message: "Can offer Italian cooking for JavaScript basics.",
    status: "pending",
    createdAt: new Date()
  },
  {
    requester: "Grace Müller",
    post: "German",
    message: "Want to learn German, can teach painting.",
    status: "pending",
    createdAt: new Date()
  },
  {
    requester: "Helen Green",
    post: "Excel",
    message: "Need help with Excel, can offer gardening tips.",
    status: "pending",
    createdAt: new Date()
  },
  {
    requester: "Ian Brown",
    post: "Photography",
    message: "Interested in photography, can teach singing.",
    status: "pending",
    createdAt: new Date()
  },
  {
    requester: "Julia Kim",
    post: "Python Programming",
    message: "Want to learn Python, can teach swimming.",
    status: "pending",
    createdAt: new Date()
  },
  {
    requester: "Clara Martinez",
    post: "Spanish",
    message: "Looking for Spanish lessons, can offer photography.",
    status: "pending",
    createdAt: new Date()
  },
  {
    requester: "David Lee",
    post: "Public Speaking",
    message: "Want to improve public speaking, can help with web design.",
    status: "pending",
    createdAt: new Date()
  }
];

async function seedDB() {
  await connectDB(process.env.MONGO_URI);

  await Share.deleteMany({});
  await Request.deleteMany({});

  await Share.insertMany(shares);
  await Request.insertMany(requests);

  console.log("Dummy data inserted!");
  mongoose.disconnect();
}

seedDB();