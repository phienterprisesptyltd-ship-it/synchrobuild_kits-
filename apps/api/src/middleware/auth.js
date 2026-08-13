import logger from '../utils/logger.js';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    // Decode JWT payload without signature verification
    // JWT format: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      req.user = null;
      return next();
    }

    // Decode the payload (second part)
    const payload = parts[1];
    // Add padding if needed for base64 decoding
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);

    const decoded = Buffer.from(padded, 'base64').toString('utf-8');
    const decodedPayload = JSON.parse(decoded);

    req.user = {
      id: decodedPayload.id,
    };

    next();
  } catch (error) {
    logger.warn('Failed to decode token:', error.message);
    req.user = null;
    next();
  }
};

export default authMiddleware;
export { authMiddleware };