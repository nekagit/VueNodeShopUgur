const router = require('express').Router();
const axios = require('axios');
const { User, LinkedAccount } = require('../db/models');

const CLIENT_KEY = 'awa08hwha39yq1lk' // this value can be found in app's developer portal
const SERVER_ENDPOINT_REDIRECT = "https://taskmatrixio.netlify.app/"
const SERVER_ENDPOINT_REDIRECT_2 = "https://taskmatrixio.netlify.app/tiktok/redirect"

const Tiktok = require('../app_modules/tiktok/Tiktok');

router.get('/auth', async (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);
    res.cookie('csrfState', csrfState, { maxAge: 60000 });

    let url = 'https://www.tiktok.com/v2/auth/authorize/';


    // the following params need to be in `application/x-www-form-urlencoded` format.
    url += `?client_key=${CLIENT_KEY}`;
    url += '&scope=user.info.basic';
    url += '&response_type=code';
    url += `&redirect_uri=${SERVER_ENDPOINT_REDIRECT_2}`;
    url += '&state=' + csrfState;
    console.log(url)
    res.status(200).json(url);
})

router.post('/oauth', async (req, res) => {
    try{
        const url = 'https://open.tiktokapis.com/v2/oauth/token/';

        const apiUrl = 'https://open.tiktokapis.com/v2/oauth/token/';
        const clientKey = 'awa08hwha39yq1lk';
        const clientSecret = 'krJfbbMHupzrVN7NrZ10gsNbvVZHMDQx';
        const { code } = req.body;
        const grantType = 'authorization_code';

        const data = {
            client_key: clientKey,
            client_secret: clientSecret,
            code: code,
            grant_type: grantType,
            redirect_uri: SERVER_ENDPOINT_REDIRECT_2,
        };

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache',
            },
        };

        const response = await axios.post(apiUrl, new URLSearchParams(data), config);
        console.log(response.status);

        // response
        if(response.status === 200 && !response.data.error){

            const tiktok_access_token = response.data.access_token;

            const tiktok_user_info = await Tiktok.getUserInfo(tiktok_access_token);

            console.log(response.data)

            const linkedAccount = new LinkedAccount({
                user_id: req.body.user_id,
                user_info: tiktok_user_info,
                provider: "Tiktok",
                token: response.data,
            })

            // get current user
            const currentUser = await User.findOne({_id: req.body.user_id});

            if(currentUser){
                // to edit - before add check linkedAccount already exist
                currentUser.linked_accounts.push(linkedAccount);
                await currentUser.save();
            }

            res.status(200).json(response.data);
        }else{
            res.status(400).json("Error: oauth tiktok failed");
        }
    }catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
})


module.exports = router;