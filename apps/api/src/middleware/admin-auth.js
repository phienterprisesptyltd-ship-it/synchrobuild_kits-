import Pocketbase from 'pocketbase';
import logger from '../utils/logger.js';
import { POCKETBASE_HOST } from '../utils/pocketbaseClient.js';

// Verifies the caller's token against PocketBase itself (auth-refresh), so
// the signature/expiry check is done by PocketBase rather than reimplemented
// here. A fresh client is used per call so this never touches the shared
// superuser-authenticated pocketbaseClient.
async function verifyAdminToken(token) {
  if (!token) {
    return null;
  }

  const client = new Pocketbase(POCKETBASE_HOST);
  client.authStore.save(token, null);

  try {
    const { record } = await client.collection('admins').authRefresh();
    return record;
  } catch (error) {
    logger.warn('Admin token verification failed:', error.message);
    return null;
  }
}

const adminAuthMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const admin = await verifyAdminToken(token);

  if (!admin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.admin = admin;
  next();
};

export default adminAuthMiddleware;
export { adminAuthMiddleware };
