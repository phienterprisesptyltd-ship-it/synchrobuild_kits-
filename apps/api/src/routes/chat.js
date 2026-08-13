import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// POST /chat/messages - Create chat message and manage session
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

  // Create message record
  const msgRecord = await pb.collection('chat_messages').create({
    sessionId,
    message,
    senderType,
    createdAt: new Date().toISOString(),
  });

  // Check if session exists
  try {
    await pb.collection('chat_sessions').getOne(sessionId);
    // Session exists, update lastMessageAt
    await pb.collection('chat_sessions').update(sessionId, {
      lastMessageAt: new Date().toISOString(),
    });
    logger.info(`Updated chat session: ${sessionId}`);
  } catch (error) {
    // Session doesn't exist, create it
    logger.info(`Creating new chat session: ${sessionId}`);
    await pb.collection('chat_sessions').create({
      sessionId,
      lastMessageAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
  }

  logger.info(`Chat message saved - messageId: ${msgRecord.id}, sessionId: ${sessionId}`);

  res.json({
    success: true,
    messageId: msgRecord.id,
    timestamp: msgRecord.createdAt,
  });
});

// GET /chat/messages - Fetch messages for a session or all sessions
router.get('/messages', async (req, res) => {
  const { sessionId } = req.query;

  if (sessionId) {
    // Fetch messages for specific session
    logger.info(`Fetching messages for sessionId: ${sessionId}`);

    const messages = await pb.collection('chat_messages').getList(1, 100, {
      filter: 'sessionId="' + sessionId + '"',
      sort: 'createdAt',
    });

    logger.info(`Retrieved ${messages.items.length} messages for sessionId: ${sessionId}`);

    // Return array directly, NOT wrapped in object
    res.json(messages.items);
  } else {
    // Fetch all sessions
    logger.info('Fetching all sessions');

    const sessions = await pb.collection('chat_sessions').getList(1, 100, {
      sort: '-lastMessageAt',
    });

    logger.info(`Retrieved ${sessions.items.length} sessions`);

    res.json({ sessions: sessions.items });
  }
});

// POST /chat/admin/messages - Admin reply to a session
router.post('/admin/messages', async (req, res) => {
  const { sessionId, message } = req.body;

  // Validate both fields
  if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid required field: sessionId' });
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid required field: message' });
  }

  logger.info(`Admin creating message for sessionId: ${sessionId}`);

  // Create admin message record
  const msgRecord = await pb.collection('chat_messages').create({
    sessionId,
    message,
    senderType: 'admin',
    createdAt: new Date().toISOString(),
  });

  // Update session lastMessageAt
  await pb.collection('chat_sessions').update(sessionId, {
    lastMessageAt: new Date().toISOString(),
  });

  logger.info(`Admin message saved - messageId: ${msgRecord.id}, sessionId: ${sessionId}`);

  res.json({
    success: true,
    messageId: msgRecord.id,
    timestamp: msgRecord.createdAt,
  });
});

export default router;