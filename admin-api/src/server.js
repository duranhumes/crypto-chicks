import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';

import * as httpMessages from './utils/httpMessages';
import { StudentController } from './students/controllers/Student';

/**
 * App instance
 */
const app = express();

if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
}
app.disable('x-powered-by');
app.use(helmet());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(compression());
app.use(hpp());
app.use(morgan('combined'));

/**
 * Routes
 */
const router = express.Router();

app.use('/v1', router);

router.get('/_healthz', (_, res) => res.sendStatus(200));
router.use('/students', StudentController);
router.post('/qr', (req, res) => {
    const qr = require('qr-image');
    const code = qr.image(
        `http://167.71.251.67:8000/v1/students/${req.body.id}`,
        {
            type: 'png',
        }
    );
    res.setHeader('Content-type', 'image/png'); //sent qr image to client side
    code.pipe(res);
});

const noContentUrls = ['/favicon.ico', '/robots.txt'];
noContentUrls.forEach(url => {
    app.all(url, (_, res) => res.sendStatus(204));
});

router.all('*', (_, res) => res.status(404).json(httpMessages.code404()));

export default app;
