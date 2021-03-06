// MongoDB database file

// read from config file 

const path = require("path");
const fs = require('fs');
const fn = path.join(__dirname, 'config.json');
let conf = "";

// if the config file exists, read it in
if (fs.existsSync(fn)) {
	const data = fs.readFileSync(fn);
	conf = JSON.parse(data);
}

// require mongoose and connect to cake database
const MONGO_PW = conf.mongo_pass || process.env.MONGO_PW;
const mongoose = require('mongoose');
mongoose.connect('mongodb://chrisDaddy:' + MONGO_PW + '@cake-shard-00-00-zpoh0.mongodb.net:27017,cake-shard-00-01-zpoh0.mongodb.net:27017,cake-shard-00-02-zpoh0.mongodb.net:27017/test?ssl=true&replicaSet=Cake-shard-0&authSource=admin');
//mongoose.connect('mongodb://localhost/cake');

// User Schema
const User = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: 'client'
	}
});

// Bakery Schema
const Bakery = new mongoose.Schema({
	bakeryId: {
		type:mongoose.Schema.Types.ObjectId, 
		ref: 'BakeryAuth'
	},
	name: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	zipcode: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	}
});

// Bakery Auth Schema
const BakeryAuth = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: 'baker'
	}
});


// Order Schema
const Order = new mongoose.Schema({
	address: {
		type: String,
		required: true
	},
	bakery: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Bakery'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

// models
mongoose.model('User', User);
mongoose.model('Bakery', Bakery);
mongoose.model('BakeryAuth', BakeryAuth);
mongoose.model('Order', Order);