# 🎥 30대 저속노화 쇼츠: Veo 3.1-Lite 영상 제작 가이드

본 문서는 사용자가 [Google Flow](https://labs.google/fx/ko/tools/flow)에서 생성된 이미지를 활용해 고품질 5초 영상(Veo 3.1-Lite)을 제작할 수 있도록 돕는 디렉팅 가이드입니다.

---

## 🛠 공통 설정 (Settings)
- **Model**: `Veo 3.1-Lite` (빠른 생성 및 실험에 최적화)
- **Length**: `5 Seconds`
- **Aspect Ratio**: `9:16` (Vertical / Shorts용)
- **Audio**: None (Lite 모델은 무음으로 생성되므로 추후 편집 시 BGM 추가 권장)

---

## 🎬 장면별 디렉팅 프롬프트 (Directing Prompts)

각 장면의 이미지를 **'Image-to-Video'** 또는 **'First/Last Frame'** 슬롯에 업로드한 후 아래 프롬프트를 입력하세요.

### Scene 1: 노화의 징후
- **이미지**: `assets/images/scene_1.png`
- **프롬프트**: `A stressed 30-year-old person sits in front of a futuristic mirror in a dimly lit modern apartment. Subtle digital HUD graphs flicker over the reflection, highlighting their eyes and skin. The camera slowly zooms in on their tired expression. Cinematic lighting, deep blue and amber tones.`

### Scene 2: 혈당 스파이크의 위험
- **이미지**: `assets/images/scene_2.png`
- **프롬프트**: `Extreme microscopic close-up of vibrant biological cells. Sharp, glowing red crystalline structures (representing sugar) slowly grow and pierce through the cellular membranes, causing them to pulse and age. Dark, atmospheric medical visualization style.`

### Scene 3: 습관 1 (채-고-밥)
- **이미지**: `assets/images/scene_3.png`
- **프롬프트**: `A premium top-down shot of a healthy meal on a minimal wooden table. A person's hand reaches in with a fork, first picking up fresh green salad leaves, then a piece of grilled salmon. Natural, soft sunlight highlights the textures of the food. Close-up, 4k detail.`

### Scene 4: 습관 2 (식후 걷기)
- **이미지**: `assets/images/scene_4.png`
- **프롬프트**: `A stylish professional in urban casual wear walking briskly along a modern park pathway at sunset. The camera is at a low angle, tracking alongside them. Golden hour light creates long shadows and a warm glow. Motion blur emphasizes speed and energy.`

### Scene 5: 습관 3 (액상과당 금지)
- **이미지**: `assets/images/scene_5.png`
- **프롬프트**: `A side-by-side artistic contrast. On the left, a crushed soda can in deep shadows. On the right, a translucent glass of steaming green tea in soft morning light. The steam rises elegantly in slow motion. Minimalist, serene aesthetic.`

### Scene 6: 변화와 생기
- **이미지**: (Scene 5와 연계 또는 단색 배경)
- **프롬프트**: `A time-lapse style transition. A tired person in a gray hoodie slowly transforms into a glowing, energetic version of themselves wearing vibrant sports gear. Their expression brightens as the background changes from a cold office to a warm, sunlit meadow. Empowering cinematic mood.`

### Scene 7: 아웃트로 (Slow Aging)
- **이미지**: `assets/images/scene_7.png`
- **프롬프트**: `A dark, textured background with bold, glowing typography that says 'SLOW AGING'. Modern geometric particles float gently around the text. A slow camera move pulls back to reveal the full title. Cinematic rim lighting, high-end YouTube Shorts outro style.`

---

## 📥 저장 및 정리
1. 생성이 완료된 영상 파일(.mp4)을 다운로드합니다.
2. 다운로드한 파일을 프로젝트의 `assets/videos/` 폴더로 이동합니다.
3. 파일명을 각각 `scene_1.mp4` ~ `scene_7.mp4`로 변경하여 관리하면 편리합니다.

> [!TIP]
> Veo 3.1-Lite는 생성 속도가 매우 빠르므로, 결과가 마음에 들지 않을 경우 프롬프트에 `cinematic`, `high detail`, `smooth motion` 등의 키워드를 추가하여 다시 시도해 보세요.
