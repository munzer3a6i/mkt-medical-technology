import { put } from '@vercel/blob';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const filename = req.query.filename as string;
  if (!filename) {
    return res.status(400).json({ error: 'filename query param required' });
  }

  try {
    // Vercel pre-parses the body — for binary uploads req.body is a Buffer
    let body = req.body;

    // If body is a string (base64-encoded by Vercel), convert to Buffer
    if (typeof body === 'string') {
      body = Buffer.from(body, 'base64');
    }

    if (!body || (Buffer.isBuffer(body) && body.length === 0)) {
      return res.status(400).json({ error: 'Empty file body' });
    }

    const blob = await put(filename, body, { access: 'public' });
    return res.status(200).json(blob);
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed', message: error.message });
  }
}
