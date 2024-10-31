const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/api/chat', async (req, res) => {
  const { question } = req.query;
  
  // Define fixed uid and sessionid
  const uid = '5731b7f293e99554';
  const sessionid = '485209443';

  if (!question) {
    return res.status(400).json({ error: 'Question parameter is missing', developer: 'GAJARBOTOL' });
  }

  try {
    const response = await fetch('https://kuli.kuki.ai/cptalk', {
      method: 'POST',
      headers: {
        'Host': 'kuli.kuki.ai',
        'Connection': 'keep-alive',
        'Content-Length': '50', // Note: This should be the actual length of the body content
        'sec-ch-ua-platform': '"Android"',
        'Save-Data': 'on',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
        'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'Content-type': 'application/x-www-form-urlencoded',
        'sec-ch-ua-mobile': '?1',
        'Accept': '*/*',
        'Origin': 'https://chat.kuki.ai',
        'Sec-Fetch-Site': 'same-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://chat.kuki.ai/',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9,bn-US;q=0.8,bn;q=0.7'
      },
      body: new URLSearchParams({
        'uid': uid,
        'input': question,
        'sessionid': sessionid
      })
    });

    const data = await response.json();

    if (data.status === 'ok' && data.responses) {
      const singleResponse = data.responses[0] || 'No valid response received.';
      return res.json({ response: singleResponse, developer: 'GAJARBOTOL' });
    } else {
      return res.status(500).json({ error: 'Invalid response from API', developer: 'GAJARBOTOL' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to connect to the server', developer: 'GAJARBOTOL' });
  }
});

module.exports = app;
