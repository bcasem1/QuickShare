import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import Share from './models/Share.js';

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quickshare';
mongoose.connect(MONGO_URI).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB error:', err));

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// POST /api/upload - Upload text or file (base64)
app.post('/api/upload', async (req, res) => {
  try {
    const { text, fileData, fileName, fileSize } = req.body;

    if (!text && !fileData) {
      return res.status(400).json({ error: 'Provide text or file data' });
    }

    const id = nanoid(8);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    const share = await Share.create({
      id,
      text: text || null,
      fileUrl: fileData || null,
      fileName: fileName || null,
      fileSize: fileSize || 0,
      expiresAt
    });

    return res.json({ id, expiresAt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Upload failed' });
  }
});

// GET /api/:id - Fetch share
app.get('/api/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const share = await Share.findOne({ id });
    
    if (!share) {
      return res.status(404).json({ error: 'Share not found or expired' });
    }

    return res.json({
      text: share.text,
      fileUrl: share.fileUrl,
      fileName: share.fileName,
      fileSize: share.fileSize,
      expiresAt: share.expiresAt
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`QuickShare server running on port ${PORT}`));
