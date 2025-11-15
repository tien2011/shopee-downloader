module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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
      return res.status(400).json({ error: true, message: 'Missing URL' });
    }

    const apiResponse = await fetch('https://4anm.top/get_download_shopee.php', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': '*/*'
      },
      body: JSON.stringify({
        urls: [url],
        token: "fh7mV0/NnxBamGg5qWTRgjVZOUNDNkcrc3l5N3RwUW1wdjFPcTZGSTF0dUx6ZE00QURtWEJ6K0VpT3VWSjloQXBrcGRjSHZvaFFCWHJyUFpoekVTUkg1VHYvZ1pUQ09ademE2N1ZBPT0="
      })
    });

    const data = await apiResponse.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};
