// backend/src/server.ts

import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
})();
