const { User } = require("../../db/models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const signUp = async function (user){

    return new Promise( async (resolve, reject) => {
        try{
            // Check if user with same email already exists in database
            const existingUser = await User.findOne({ email: user.email });
            if (existingUser) {
                throw new Error("Email already exists");
            }
            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash( user.password, 10);

            // Create new user document in MongoDB
            const newUser = new User({
                username: user.username,
                email: user.email,
                password: hashedPassword
            });

            // Save in DB
            await newUser.save();

            // Create JWT token
            let jwtPayload = { userId: newUser._id };
            let jwtSecret =  process.env.JWT_SECRET;
            let jwtOptions = { expiresIn: '1h' };
            const token = jwt.sign(jwtPayload, jwtSecret, jwtOptions);

            // Return Token and User
            resolve({
                token,
                user: newUser
            });
        }catch (e) {
            reject(e);
        }
    })
}


const signIn = async function (user) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!user.email && !user.username) {
                throw new Error('No email or username provided');
            }

            // Suche nach E-Mail oder Benutzername
            const loadedUser = await User.findOne({
                $or: [{ email: user.email }, { username: user.username }]
            });

            if (!loadedUser) {
                throw new Error('Invalid username or password');
            }

            // Vergleiche das Passwort
            const isMatch = await bcrypt.compare(user.password, loadedUser.password);

            if (!isMatch) {
                throw new Error('Invalid email or password');
            }

            // Erstelle und signiere JWT
            const jwtPayload = { user: { id: loadedUser.id } };
            const jwtSecret = process.env.JWT_SECRET;
            const jwtOptions = { expiresIn: '1h' };
            const token = jwt.sign(jwtPayload, jwtSecret, jwtOptions);

            resolve(token);
        } catch (e) {
            reject(e);
        }
    });
}


const auth = async function (token){
    return new Promise( async (resolve, reject) => {
        try{
            // Check if no token
            if (!token) {
                throw new Error('No token, authorization denied');
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add user from payload
            let user = decoded.user;
            resolve(user.id)
        }catch(e){
            reject(e)
        }
    })
}


const tiktokAuth = async function(){
    try{

    }catch (e) {
        console.log(e);
    }
}

const getAll = async function(){
    try{
        return await User.find();
    }catch (e) {
        console.log(e);
    }
}

const getById = async function(id){
    try {
        return await User.findById(id);
    }catch (e) {
        console.log(e);
    }
}

module.exports = {
    signUp,
    signIn,
    auth,
    getAll,
    getById,
}