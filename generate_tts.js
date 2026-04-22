const fs = require('fs');
const https = require('https');
const path = require('path');

const planFile = path.resolve(__dirname, 'plan.json');
const outputDir = path.resolve(__dirname, 'assets', 'tts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const plan = JSON.parse(fs.readFileSync(planFile, 'utf8'));

async function downloadTTS(text, filename) {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ko&client=tw-ob`;
  const file = fs.createWriteStream(filename);
  
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download TTS: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

async function generateAll() {
  for (const item of plan) {
    const filename = path.join(outputDir, `scene_${item.scene}.mp3`);
    console.log(`Generating TTS for scene ${item.scene}...`);
    try {
      await downloadTTS(item.script, filename);
      console.log(`Saved to ${filename}`);
    } catch (err) {
      console.error(`Error for scene ${item.scene}:`, err.message);
    }
  }
}

generateAll();
