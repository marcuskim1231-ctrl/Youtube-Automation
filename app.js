// 30대 건강 상식(저속노화) 쇼츠 대본 데이터
const SHORTS_DATA = [
    {
      "scene": 1,
      "script": "30대, 유독 빨리 늙는 기분이 든다면? 범인은 바로 당신의 식탁에 있습니다.",
      "image_prompt": "A stressed 30s person looking in a high-tech mirror, subtle futuristic digital HUD overlay showing 'Aging Speed Accelerated', cinematic lighting, deep blue and orange mood, 8k resolution."
    },
    {
      "scene": 2,
      "script": "혈당 스파이크가 세포 노화를 가속화한다는 사실, 알고 계셨나요? 단 음식을 먹으면 우리 몸은 녹슬어갑니다.",
      "image_prompt": "A microscopic view of human cells being attacked by glowing red sugar crystals, representing oxidation and glycation, dramatic dark background, sci-fi medical illustration style."
    },
    {
      "scene": 3,
      "script": "노화를 늦추는 첫 번째 습관, '채-고-밥 법칙'! 채소, 고기, 밥 순서로 드세요. 혈당 상승이 놀라울 정도로 완만해집니다.",
      "image_prompt": "A beautiful, premium food photography of a structured meal: a crisp green salad in front, grilled salmon in the middle, and a small bowl of purple rice in the back, shallow depth of field, natural sunlight."
    },
    {
      "scene": 4,
      "script": "두 번째는 식후 10분 걷기입니다. 거창한 운동 말고 딱 10분만 걸으세요. 근육이 당을 연료로 태워줍니다.",
      "image_prompt": "A stylish 30s man or woman in urban casual wear walking briskly through a sun-drenched modern park walking trail, dynamic low angle shot, motion blur in the background."
    },
    {
      "scene": 5,
      "script": "세 번째, 액상과당과 작별하세요. 콜라나 믹스커피는 노화 하이패스입니다. 대신 따뜻한 차 한 잔으로 세포를 보호하세요.",
      "image_prompt": "Artistic comparison: a dark, crushed soda can in shadows versus a glowing, elegant glass of green tea with steam rising in soft morning light, minimalist aesthetic."
    },
    {
      "scene": 6,
      "script": "지금 이 작은 습관들이 10년 뒤 당신의 생체 나이를 결정합니다. 늦지 않았습니다.",
      "image_prompt": "A split screen or transition showing a tired person transforming into a vibrant, energetic 40s version of themselves, golden hour lighting, symbolizing vitality and successful aging."
    },
    {
      "scene": 7,
      "script": "더 젊고 건강한 미래를 원한다면? 오늘부터 '저속노화 루틴' 지금 바로 시작하세요!",
      "image_prompt": "A premium typographic design saying 'SLOW AGING' on a dark textured background, cinematic rim lighting, professional YouTube Shorts outro style."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    console.log('UI App Started using embedded data.');
    const sceneImage = document.getElementById('scene-image');
    const sceneScript = document.getElementById('scene-script');
    const scenePrompt = document.getElementById('scene-prompt');
    const currentSceneNum = document.getElementById('current-scene-number');
    const progressFill = document.getElementById('progress-fill');
    const indicatorsContainer = document.getElementById('indicators');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const jsonViewer = document.getElementById('json-viewer');
    const contentOverlay = document.querySelector('.content-overlay');

    let currentIndex = 0;
    const scenes = SHORTS_DATA;

    function initIndicators() {
        indicatorsContainer.innerHTML = '';
        scenes.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (i === 0) dot.classList.add('active');
            indicatorsContainer.appendChild(dot);
        });
    }

    function updateScene() {
        const scene = scenes[currentIndex];
        
        // Hide content for transition
        contentOverlay.classList.remove('visible');
        
        setTimeout(() => {
            currentSceneNum.textContent = scene.scene;
            sceneScript.textContent = scene.script;
            scenePrompt.textContent = scene.image_prompt;
            
            // Visual Update - Sequence of generated images
            const sceneImagePath = `assets/images/scene_${scene.scene}.png`;
            
            // Check if image exists (fallback to colors)
            const colors = [
                'rgba(99, 102, 241, 0.4)', 
                'rgba(244, 63, 94, 0.4)', 
                'rgba(16, 185, 129, 0.4)', 
                'rgba(245, 158, 11, 0.4)', 
                'rgba(139, 92, 246, 0.4)', 
                'rgba(236, 72, 153, 0.4)', 
                'rgba(6, 182, 212, 0.4)'
            ];
            
            sceneImage.style.backgroundColor = colors[currentIndex % colors.length];
            
            // Try to set background image
            const img = new Image();
            img.src = sceneImagePath;
            img.onload = () => {
                sceneImage.style.backgroundImage = `url('${sceneImagePath}')`;
                sceneImage.style.backgroundBlendMode = "overlay";
            };
            img.onerror = () => {
                // If specific scene image is missing, fallback to hero image for first/last scene or none
                if (currentIndex === 0 || currentIndex === scenes.length - 1) {
                    sceneImage.style.backgroundImage = "url('assets/hero.png')";
                    sceneImage.style.backgroundBlendMode = "overlay";
                } else {
                    sceneImage.style.backgroundImage = "none";
                }
            };

            // Progress bar and Indicators
            const progress = ((currentIndex + 1) / scenes.length) * 100;
            progressFill.style.width = `${progress}%`;
            
            document.querySelectorAll('.indicator').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });

            // Button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === scenes.length - 1;

            // Show content
            contentOverlay.classList.add('visible');
        }, 150);
    }

    // Initialize UI
    jsonViewer.textContent = JSON.stringify(scenes, null, 2);
    initIndicators();
    updateScene();

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        if (currentIndex < scenes.length - 1) {
            currentIndex++;
            updateScene();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateScene();
        }
    });

    document.getElementById('download-json').addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(scenes, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "plan.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });
});
