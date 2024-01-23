const router = require('express').Router();
const { User, Brand } = require('../db/models');
const userAuth = require('../app_modules/user/UserAuth');

router.get('/', async (req, res) => {
    try {
        const result = await userAuth.getAll();
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const result = await userAuth.getById(id);
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/signup', async (req, res) => {
    try {
        let signUpPayload = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }
        const result = await userAuth.signUp(signUpPayload);
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        let signUpPayload = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }
        const result = await userAuth.signIn(signUpPayload);
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/auth', async (req, res) => {
    try {
        const result = await userAuth.auth(req.body.token);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

const CLIENT_KEY = 'awa08hwha39yq1lk' // this value can be found in app's developer portal

router.post('/auth/tiktok', (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);
    res.cookie('csrfState', csrfState, { maxAge: 60000 });

    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    const SERVER_ENDPOINT_REDIRECT = "https://taskmatrixio.netlify.app/"

    // the following params need to be in `application/x-www-form-urlencoded` format.
    url += `?client_key=${CLIENT_KEY}`;
    url += '&scope=user.info.basic';
    url += '&response_type=code';
    url += `&redirect_uri=${SERVER_ENDPOINT_REDIRECT}`;
    url += '&state=' + csrfState;
    console.log(url)
    res.redirect(url);
})

router.get('/auth/tiktok', async (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);
    res.cookie('csrfState', csrfState, { maxAge: 60000 });

    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    const SERVER_ENDPOINT_REDIRECT = "https://taskmatrixio.netlify.app/"
    const SERVER_ENDPOINT_REDIRECT_2 = "https://taskmatrixio.netlify.app/tiktok/redirect"

    // the following params need to be in `application/x-www-form-urlencoded` format.
    url += `?client_key=${CLIENT_KEY}`;
    url += '&scope=user.info.basic';
    url += '&response_type=code';
    url += `&redirect_uri=${SERVER_ENDPOINT_REDIRECT}`;
    url += '&state=' + csrfState;
    console.log(url)
    res.status(200).json(url);
})

/* LINKED ACCOUNT ROUTES */

router.get('/:userId/linked-account', async (req, res) => {
    try {
        let { userId } = req.params;

        if (!userId) {
            res.status(400).json("Invalid or missing 'userId' parameter.");
            return;
        }

        const user = await User.findById(userId);
        res.status(200).json(user.linked_accounts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:userId/linked-account/:id', async (req, res) => {
    try {
        let { userId, id } = req.params;
        console.log(userId, id);
        const user = await User.findById(userId);

        if (!id) {
            return res.status(400).json("Invalid or missing 'id' parameter.");
        }

        const result = await User.findByIdAndUpdate(userId, {
            $pull: { linked_accounts: { _id: id } }
        });

        const brand_result = await Brand.updateMany({user_id: userId}, {
            $pull: { linked_accounts: id }
        });
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;