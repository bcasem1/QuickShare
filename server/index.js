const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));

// In-memory storage with TTL
const shares = new Map();

// Clean up expired shares every minute
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of shares.entries()) {
    if (data.expiresAt < now) {
      shares.delete(key);
    }
  }
}, 60000);

// POST endpoint to create a share
app.post('/api/share', (req, res) => {
  try {
    const { text, fileName, fileData } = req.body;
    
    if (!text && !fileData) {
      return res.status(400).json({ error: 'No content provided' });
    }
    
    // Generate unique share ID
    const shareId = crypto.randomBytes(6).toString('hex');
    
    // Store share data with 30-minute expiration
    const expiresAt = Date.now() + (30 * 60 * 1000);
    shares.set(shareId, {
      text: text || '',
      fileName: fileName || '',
      fileData: fileData || '',
      createdAt: Date.now(),
      expiresAt: expiresAt
    });
    
    res.json({
      shareId,
      expiresAt,
      url: `${process.env.FRONTEND_URL || 'https://bcasem1.github.io/QuickShare/client'}?share=${shareId}`
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET endpoint to retrieve shared content
app.get('/api/share/:shareId', (req, res) => {
  try {
    const { shareId } = req.params;
    const data = shares.get(shareId);
    
    if (!data) {
      return res.status(404).json({ error: 'Share not found or expired' });
    }
    
    const now = Date.now();
    if (data.expiresAt < now) {
      shares.delete(shareId);
      return res.status(404).json({ error: 'Share expired' });
    }
    
    res.json({
      text: data.text,
      fileName: data.fileName,
      fileData: data.fileData,
      expiresAt: data.expiresAt
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`QuickShare server running on port ${PORT}`);
});
