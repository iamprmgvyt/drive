import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/api/v1/time-health', (req, res) => {
  const serverUtc = new Date().toISOString();
  // Placeholder: real implementation should query chrony/systemd-timesyncd and compute offset
  const timeHealth = {
    server_utc: serverUtc,
    synchronized: false,
    estimated_offset_seconds: 0.0,
    last_sync_time: null
  };
  res.json(timeHealth);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

const port = process.env.VPS_SERVICE_PORT ? parseInt(process.env.VPS_SERVICE_PORT, 10) : 8443;
app.listen(port, () => {
  console.log(`VPS storage service listening on port ${port}`);
});
