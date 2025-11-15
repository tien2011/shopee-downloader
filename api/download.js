const fetch = require('node-fetch');

const TOKEN = "fh7mV0/NnxBamGg5qWTRgjVZOUNDNkcrc3l5N3RwUW1wdjFPcTZGSTF0dUx6ZE00QURtWEJ6K0VpT3VWSjloQXBrcGRjSHZvaFFCWHJyUFpoekVTUkg1VHYvZ1pUQ09admE2N1ZBPT0=";

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, message: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: true, message: 'URL không được để trống' });
    }

    const response = await fetch('https://4anm.top/get_download_shopee.php', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({
        urls: [url],
        token: TOKEN
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};
