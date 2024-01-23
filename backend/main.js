const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 4000;
const os = require('os');
const fs = require('fs');
const https = require('https');
const http = require('http');

const mongoose = require('./db/mongoose');
const socket = require('./socket')

app.use(bodyParser.json());
app.use(cors());

const userRoutes = require('./routes/user.routes');
const brandRoutes = require('./routes/brand.routes');
const tiktokRoutes = require('./routes/tiktok.routes');

app.use('/api/user', userRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/tiktok', tiktokRoutes);


(async () => {
    try {
        let httpServer;

        const osInfo = {
            platform: os.platform(),
            type: os.type(),
            release: os.release(),
            architecture: os.arch(),
        };

        if (osInfo.type && osInfo.type.toLowerCase().includes('linux')) {
            const privateKey = fs.readFileSync('/home/ugur/letsencrypt/live/tobyabe.cloud/privkey.pem');
            const certificate = fs.readFileSync('/home/ugur/letsencrypt/live/tobyabe.cloud/cert.pem');

            const httpsOptions = {
                key: privateKey,
                cert: certificate,
            };
            httpServer = https.createServer(httpsOptions, app);
        } else {
            httpServer = http.createServer(app);
        }

        // Mongodb connect
        await mongoose.connect();


        httpServer.listen(PORT, () => {
            console.clear();
            console.log(`Bot is listening on port ${PORT}`);
        });

        socket.init(httpServer);

    } catch (e) {
        console.log('error: ', e);
    }
})();