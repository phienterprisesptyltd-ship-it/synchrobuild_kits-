import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';
import { adminAuthMiddleware } from '../middleware/admin-auth.js';

const router = express.Router();

// POST /chat/sessions - Create or locate a chat session (idempotent)
router.post('/sessions', async (req, res) => {
  const { sessionId, customerName } = req.body;

  // Validate required fields
  if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid required field: sessionId' });
  }

  if (!customerName || typeof customerName !== 'string' || customerName.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid required field: customerName' });
  }

  logger.info(`Creating or locating session - sessionId: ${sessionId}, customerName: ${customerName}`);

  try {
    // Look up existing session by sessionId field (not record ID)
    const existingSession = await pb.collection('chat_sessions').getList(1, 1, {
      filter: 'sessionId="' + sessionId + '"',
    });

    if (existingSession.items.length > 0) {
      // Session exists - return it (idempotent)
      logger.info(`Session already exists: ${sessionId}`);
      return res.json({
        success: true,
        sessionId: existingSession.items[0].sessionId,
        recordId: existingSession.items[0].id,
      });
    }

    // Session doesn't exist - create new one
    const newSession = await pb.collection('chat_sessions').create({
      sessionId,
      customerName,
      createdAt: new Date().toISOString(),
      lastMessageAt: new Date().toISOString(),
    });

    logger.info(`New session created: ${sessionId}, recordId: ${newSession.id}`);

    res.json({
      success: true,
      sessionId: newSession.sessionId,
      recordId: newSession.id,
    });
  } catch (error) {
    logger.error(`Error creating/locating session: ${error.message}`);
    res.status(500).json({ error: 'Failed to create or locate session' });
  }
});

// POST /chat/messages - Create chat message (requires existing session)
router.post('/messages', async (req, res) => {
  const { sessionId, message, senderType } = req.body;

  // Validate: sessionId and message must be non-empty strings
  if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid required field: sessionId' });
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid required field: message' });
  }

  logger.info(`Creating chat message - sessionId: ${sessionId}, senderType: ${senderType}`);

  try {
    // Confirm session exists by looking up by sessionId field
    const sessionResult = await pb.collection('chat_sessions').getList(1, 1, {
      filter: 'sessionId="' + sessionId + '"',
    });

    if (sessionResult.items.length === 0) {
      return res.status(404).json({ error: 'Session not found. Create session first via POST /chat/sessions' });
    }

    const sessionRecordId = sessionResult.items[0].id;

    // Create message record
    const msgRecord = await pb.collection('chat_messages').create({
      sessionId,
      message,
      senderType,
      createdAt: new Date().toISOString(),
    });

    // Update session lastMessageAt using actual record ID
    await pb.collection('chat_sessions').update(sessionRecordId, {
      lastMessageAt: new Date().toISOString(),
    });

    logger.info(`Chat message saved - messageId: ${msgRecord.id}, sessionId: ${sessionId}`);

    res.json({
      success: true,
      messageId: msgRecord.id,
      timestamp: msgRecord.createdAt,
    });
  } catch (error) {
    logger.error(`Error creating message: ${error.message}`);
    res.status(500).json({ error: 'Failed to create message' });
  }
});

// GET /chat/messages?sessionId=... - Fetch messages for a single session (public, session-scoped)
router.get('/messages', async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid required query parameter: sessionId' });
  }

  logger.info(`Fetching messages for sessionId: ${sessionId}`);

  const messages = await pb.collection('chat_messages').getList(1, 100, {
    filter: 'sessionId="' + sessionId + '"',
    sort: 'createdAt',
  });

  logger.info(`Retrieved ${messages.items.length} messages for sessionId: ${sessionId}`);

  // Return array directly, NOT wrapped in object
  res.json(messages.items);
});

// GET /chat/admin/sessions - List all chat sessions (admin only)
router.get('/admin/sessions', adminAuthMiddleware, async (req, res) => {
  logger.info('Fetching all sessions');

  const sessions = await pb.collection('chat_sessions').getList(1, 100, {
    sort: '-lastMessageAt',
  });

  logger.info(`Retrieved ${sessions.items.length} sessions`);

  res.json({ sessions: sessions.items });
});

// POST /chat/admin/messages - Admin reply to a session (admin only)
router.post('/admin/messages', adminAuthMiddleware, async (req, res) => {
  const { sessionId, message } = req.body;

  // Validate both fields
  if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid required field: sessionId' });
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid required field: message' });
  }

  logger.info(`Admin creating message for sessionId: ${sessionId}`);

  try {
    // Look up session by sessionId field to get actual record ID
    const sessionResult = await pb.collection('chat_sessions').getList(1, 1, {
      filter: 'sessionId="' + sessionId + '"',
    });

    if (sessionResult.items.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const sessionRecordId = sessionResult.items[0].id;

    // Create admin message record
    const msgRecord = await pb.collection('chat_messages').create({
      sessionId,
      message,
      senderType: 'admin',
      createdAt: new Date().toISOString(),
    });

    // Update session lastMessageAt using actual record ID
    await pb.collection('chat_sessions').update(sessionRecordId, {
      lastMessageAt: new Date().toISOString(),
    });

    logger.info(`Admin message saved - messageId: ${msgRecord.id}, sessionId: ${sessionId}`);

    res.json({
      success: true,
      messageId: msgRecord.id,
      timestamp: msgRecord.createdAt,
    });
  } catch (error) {
    logger.error(`Error creating admin message: ${error.message}`);
    res.status(500).json({ error: 'Failed to create admin message' });
  }
});

export default router;