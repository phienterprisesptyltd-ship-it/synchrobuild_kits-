import { Router } from 'express';
import healthCheck from './health-check.js';
import chatRouter from './chat.js';
import adminRouter from './admin.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.use('/chat', chatRouter);
    router.use('/admin', adminRouter);

    return router;
};