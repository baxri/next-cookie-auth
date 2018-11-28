const next = require('next');
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

const AUTH_USER_TYPE = 'authenticated';
const COOKIE_SECRET = 'ibjhb63kj4b6hj45b36kjh45b6k3h4j5b6';
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: !dev,
    signed: true,
};

const authenticate = async (email, password) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');

    return data.find(user => {
        if (user.email === email && user.website === password) {
            return user;
        }
    });
}

app.prepare().then(() => {

    const server = express();

    server.use(express.json());
    server.use(cookieParser(COOKIE_SECRET));

    server.get('/api/profile', async (req, res) => {
        const { signedCookies = {} } = req;
        const { token } = signedCookies;

        if (token && token.email) {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');

            const userProfile = data.find(user => {
                return user.email = token.email;
            });

            res.json({ user: userProfile });
        }

        res.sendStatus(404);
    });

    server.post('/api/login', async (req, res) => {
        const { email, password } = req.body;

        const user = await authenticate(email, password);

        if (!user) {
            return res.status(403).send();
        }

        const userData = {
            name: user.name,
            email: user.email,
            type: AUTH_USER_TYPE,
        }

        res.cookie('token', userData, COOKIE_OPTIONS);

        res.json(userData);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {

        if (err) {
            throw err;
        }

        console.log(`Listening on port ${port}`);
    })
});