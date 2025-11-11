# QuickShare - Instant File & Text Sharing

🚀 **Login-free personal sharing website** - Share files and text instantly between devices without any authentication!

## Features

✅ **No Login Required** - Just generate a unique link and share  
✅ **Instant Sharing** - Upload from phone, access from PC  
✅ **Auto Delete** - All content automatically deletes after 30 minutes  
✅ **Text & Files** - Share text snippets or upload files  
✅ **Download Button** - Easy download for recipients  
✅ **Countdown Timer** - See exactly when content expires  
✅ **Responsive Design** - Works perfectly on mobile & desktop  

## Tech Stack

- **Frontend**: React + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB with TTL indexes
- **Deployment**: Vercel (frontend) + Render (backend)

## Quick Start

### Prerequisites
- Node.js 16+
- MongoDB
- npm or yarn

### Installation

```bash
# Install dependencies for both server and client
cd server && npm install
cd ../client && npm install
```

### Environment Setup

Create `.env` files:

**server/.env**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/quickshare
UPLOAD_DIR=uploads
CORS_ORIGIN=http://localhost:3000
```

**client/.env**
```
REACT_APP_API_URL=http://localhost:5000
```

### Run Locally

```bash
# Terminal 1 - Start backend
cd server
npm start

# Terminal 2 - Start frontend
cd client
npm start
```

Open http://localhost:3000 in your browser!

## How It Works

1. **Upload**: Paste text or select a file on the home page
2. **Share**: Copy the generated unique link (example: yoursite.com/abc123xy)
3. **Receive**: Open the link on any device to view and download
4. **Auto Delete**: Content automatically removes after 30 minutes

## API Endpoints

- `POST /upload` - Upload text or file
- `GET /:id` - Fetch shared content by ID

## Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set environment variables in Render dashboard
4. Deploy!

### Deploy Frontend to Vercel

1. Connect GitHub repo to Vercel
2. Set `REACT_APP_API_URL` to your Render backend URL
3. Deploy automatically on every push!

## Project Structure

```
QuickShare/
├── server/              # Node.js + Express backend
│   ├── models/
│   │   └── Share.js    # MongoDB Share model with TTL
│   ├── index.js        # Express server setup
│   └── package.json
└── client/              # React frontend
    ├── public/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.js      # Upload page
    │   │   └── SharePage.js # View/download page
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## License

MIT

## Support

For issues and questions, open an issue on GitHub!
