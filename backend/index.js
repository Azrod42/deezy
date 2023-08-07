import {initDB, UserModel} from "./database/connect.js";
import * as dotenv from "dotenv";
import express from 'express';
import axios from "axios";
import cors from 'cors'
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import {authorization} from "./database/jwt.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const db = initDB()

app.use(cors({
    origin: process.env.FRONT,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// .then((db) => {
//     const MyModel = db.model('Users', new Schema({ name: String, id: String }));
//     const name = "Jean";
//     MyModel.findOne({name: new RegExp('^' + name + '$', 'i')}).then((err, doc) => {
//         console.log(err);
//     })
// });

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.get('/deezer-auth-callback', (req, resp) => {
    //get code from callback
    const code = req.query?.code;
    let usrToken = 'error';
    //get token from deezer
    axios.get(`https://connect.deezer.com/oauth/access_token.php?app_id=${process.env.DEEZERID}&secret=${process.env.DEEZERSECRET}&code=${code}`)
        .then(function (response) {
            if (response.data !== 'wrong code') {
                usrToken = response.data.substring(13).split('&')[0];
                    axios.get(`https://api.deezer.com/user/me?access_token=${usrToken}`).then((res) => {
                       if (res.data?.id) {
                           // console.log(res.data) // data from deezer
                           UserModel.findOne({email: new RegExp('^' + res.data?.email + '$', 'i')}).then((res2) => {
                               if (res2?.id) {
                                   res2.token = usrToken;
                                   res2.save();
                                   return resp.redirect(`${process.env.FRONT}${process.env.DEEZERTOFRONT}${res.data?.email}`);

                               }
                               else {
                                   const newUser = new UserModel({
                                       id: res.data?.id,
                                       displayName: res.data?.firstname,
                                       email: res.data?.email,
                                       token: usrToken,
                                   });
                                   newUser.save().then(res => {
                                       if (res == newUser)
                                            console.log('New user created');
                                       return resp.redirect(`${process.env.FRONT}${process.env.DEEZERTOFRONT}${res.data?.email}`);
                                   })
                               }
                           })
                       }
                    }).catch(res => console.log(res));
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
        })
});

app.post('/login', async (req, res) => {
    if (req.body?.code) {
        // const token = await CryptoJS.AES.decrypt(atob(req.body.code), process.env.JWTSECRET).toString(CryptoJS.enc.Utf8);
        const token = req.body.code;
        //Get User Data
        const user = await UserModel.findOne({email: new RegExp('^' + token + '$', 'i')})


        if (user) {     //If is register user > send cookie
            const jwtToken = jwt.sign({id: user.id, email: user.email, displayName: user.displayName}, process.env.JWTSECRET);
            return res.cookie("access_token", jwtToken, {maxAge: 86400 * 1000, httpOnly: true, domain: process.env.SITE_NAME,})
                .json({status: true, message: "Logged in successfully 😊"});
        } else {        //else return false
            res.send({status: false});
        }
    }
})

app.get('/is-log', await authorization, async (req, res, next) => {
    return res.send(true);
})

app.get('/get-user-data', await authorization, async (req, res, next) => {
    const user = await UserModel.findOne({email: new RegExp('^' + req?.email + '$', 'i')})
    if (user)
        return res.send(user);
    return res.send(false);
})

app.post('/search',await authorization, async (req, res) => {
    if (req.body.input) {
        const searchResult = await axios.get(`https://api.deezer.com/search?q=${req.body.input}`);
        return res.send(searchResult.data);
    }
});

app.get('/trending',await authorization, async (req, res) => {
    const searchResult = await axios.get(`https://api.deezer.com/playlist/3155776842`);
    return res.send(searchResult.data);
});

app.post('/song',await authorization, async (req, res) => {
    if (req.body.id) {
        const searchResult = await axios.get(`https://api.deezer.com/track/${req.body.id}`);
        return res.send(searchResult.data);
    }
});

app.get('/logout',await authorization, (req, res) => {
            return res.cookie("access_token", '', {maxAge: 0, httpOnly: true, domain: process.env.SITE_NAME,})
                .json({status: true, message: "Logged out successfully 😊"});
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});