const fs = require('fs');

async function run() {
  try {
    const url = 'https://miranajewels.com/policies/terms-of-service';
    console.log('Fetching live terms from', url);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    console.log('Fetched HTML length:', html.length);
    fs.writeFileSync('terms_live.html', html);

    // Let's find shopify-policy__body in the live HTML
    const key = 'class="shopify-policy__body"';
    const index = html.indexOf(key);
    if (index !== -1) {
      console.log('Found shopify-policy__body in live HTML at:', index);
      const start = html.indexOf('>', index) + 1;
      const end = html.indexOf('</div>', start);
      const rawText = html.slice(start, end)
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      console.log('Clean policy text length:', rawText.length);
      fs.writeFileSync('cleaned_terms.txt', rawText);
      console.log('Saved policy text to cleaned_terms.txt');
    } else {
      console.log('shopify-policy__body not found in live HTML. Trying general parsing.');
      // Just extract main content text
      const cleanText = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      fs.writeFileSync('cleaned_terms.txt', cleanText.slice(0, 20000));
    }
  } catch (err) {
    console.error('Error fetching live terms:', err.message);
  }
}

run();
