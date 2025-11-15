// KHÔNG cần require node-fetch trên Vercel
// Vercel tự động hỗ trợ fetch

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, message: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ 
        error: true, 
        message: 'URL không được để trống' 
      });
    }

    const TOKEN = "fh7mV0/NnxBamGg5qWTRgjVZOUNDNkcrc3l5N3RwUW1wdjFPcTZGSTF0dUx6ZE00QURtWEJ6K0VpT3VWSjloQXBrcGRjSHZvaFFCWHJyUFpoekVTUkg1VHYvZ1pUQ09ademE2N1ZBPT0=";

    // Gọi API 4anm.top
    const response = await fetch('https://4anm.top/get_download_shopee.php', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({
        urls: [url],
        token: TOKEN
      })
    });

    // Kiểm tra response
    if (!response.ok) {
      throw new Error(`API trả về lỗi: ${response.status}`);
    }

    const data = await response.json();
    
    // Trả về cho client
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: true, 
      message: error.message || 'Có lỗi xảy ra' 
    });
  }
};
