const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const plan = JSON.parse(fs.readFileSync('plan.json', 'utf8'));
const videoFiles = [
  'assets/videos/Animate_this_scene_202604211430.mp4',
  'assets/videos/Animate_this_scene_202604211431 (1).mp4',
  'assets/videos/Animate_this_scene_202604211431.mp4'
];

const FFMPEG_PATH = `"C:\\Users\\A\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1-full_build\\bin\\ffmpeg.exe"`;
const FFPROBE_PATH = `"C:\\Users\\A\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1-full_build\\bin\\ffprobe.exe"`;

function getDuration(file) {
  try {
    const output = execSync(`${FFPROBE_PATH} -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${file}"`).toString();
    return parseFloat(output);
  } catch (e) {
    return 5.0; // Fallback
  }
}

const scenes = [];
const tempFiles = [];

console.log('Processing scenes...');

plan.forEach((item, index) => {
  const sceneNum = item.scene;
  const ttsFile = `assets/tts/scene_${sceneNum}.mp3`;
  const ttsDuration = getDuration(ttsFile);
  const srcVideo = videoFiles[index % videoFiles.length];
  const outScene = `scene_${sceneNum}_temp.mp4`;
  
  // Create a silent background matching TTS length if video is shorter
  // For simplicity, we loop the video to cover the TTS duration.
  // We use filter_complex to map video and tts.
  const cmd = `${FFMPEG_PATH} -y -stream_loop -1 -i "${srcVideo}" -i "${ttsFile}" -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setpts=PTS-STARTPTS[v];[1:a]volume=1.5[a]" -map "[v]" -map "[a]" -t ${ttsDuration} -c:v libx264 -preset ultrafast -pix_fmt yuv420p "${outScene}"`;
  
  console.log(`Processing Scene ${sceneNum}...`);
  execSync(cmd);
  scenes.push(outScene);
  tempFiles.push(outScene);
});

// Concatenate all scenes
const concatFile = 'concat_list.txt';
fs.writeFileSync(concatFile, scenes.map(s => `file '${s}'`).join('\n'));

console.log('Concatenating scenes...');
const mergedNoBgm = 'merged_no_bgm.mp4';
execSync(`${FFMPEG_PATH} -y -f concat -safe 0 -i ${concatFile} -c copy ${mergedNoBgm}`);
tempFiles.push(mergedNoBgm, concatFile);

// Add BGM
const finalFile = 'final_shorts.mp4';
const bgmFile = 'assets/bgm.mp3';

if (fs.existsSync(bgmFile)) {
  console.log('Adding BGM...');
  const totalDuration = getDuration(mergedNoBgm);
  execSync(`${FFMPEG_PATH} -y -i ${mergedNoBgm} -stream_loop -1 -i ${bgmFile} -filter_complex "[0:a]volume=1.0[v_aud];[1:a]volume=0.2[bgm_aud];[v_aud][bgm_aud]amix=inputs=2:duration=first[a]" -map 0:v -map "[a]" -t ${totalDuration} -c:v copy -c:a aac -b:a 192k ${finalFile}`);
} else {
  console.log('BGM file not found, skipping BGM step.');
  fs.copyFileSync(mergedNoBgm, finalFile);
}

// Cleanup
console.log('Cleaning up...');
tempFiles.forEach(f => {
  try { fs.unlinkSync(f); } catch(e) {}
});

console.log('Successfully created final_shorts.mp4');
