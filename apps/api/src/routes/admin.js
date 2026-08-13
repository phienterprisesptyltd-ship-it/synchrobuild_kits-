import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import { authMiddleware } from '../middleware/auth.js';
import logger from '../utils/logger.js';

const router = express.Router();

// POST /admin/login - Authenticate admin with PocketBase credentials
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields: email, password' });
  }

  try {
    // Authenticate with PocketBase admins collection
    const authData = await pb.collection('admins').authWithPassword(email, password);

    if (!authData || !authData.record) {
      throw new Error('Authentication failed');
    }

    res.json({
      success: true,
      adminId: authData.record.id,
      token: authData.token,
      admin: {
        id: authData.record.id,
        email: authData.record.email,
        name: authData.record.name,
      },
    });
  } catch (error) {
    logger.warn('Admin login failed:', error.message);
    throw new Error('Invalid admin credentials');
  }
});

// GET /admin/verify - Verify admin token (protected route)
router.get('/verify', authMiddleware, async (req, res) => {
  if (!req.user || !req.user.id) {
    throw new Error('Unauthorized: Missing or invalid token');
  }

  try {
    // Verify user exists in admins collection
    const admin = await pb.collection('admins').getOne(req.user.id);

    if (!admin) {
      throw new Error('User is not an admin');
    }

    res.json({
      success: true,
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
    });
  } catch (error) {
    logger.warn('Admin verification failed:', error.message);
    throw new Error('User is not an admin');
  }
});

export default router;