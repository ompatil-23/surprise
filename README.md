# 🌌 To My Favorite Person • Romantic Birthday Surprise

An intimate, celestial, and deeply romantic digital birthday surprise web application built with **React**, **Tailwind CSS**, and **Web Audio API**, meticulously engineered from your **Stitch** design system (*"Nocturne & Stardust"*).

---

## ✨ Experience Highlights

- **Chapter 1: Secret Welcome Screen**
  - Atmospheric twilight canvas with floating radial nebulae and twinkling stardust.
  - Interactive **Cosmic Parcel with Wax Seal**: touch to break the seal and unveil the galaxy.
  - Real-time inline name customization with instant local persistence.
  - Overview cards to preview the journey.

- **Chapter 2: Our Little World (Memories Gallery)**
  - Tactile scrapbooking layout with tilted Polaroid photo frames, washi tape, and dried botanicals.
  - **Memory Lightbox Modal**: View pictures up-close, read romantic anecdotes, listen to voice snippet notes, and favorite memories.
  - **Add Snapshot Modal**: Upload personal photos or paste image URLs directly.
  - **Play Keepsake Slideshow**: Full-screen automated photo memories walkthrough.
  - Timeline filter: *All Timelines*, *2024 (Now)*, *2023 (Firsts)*, *2022 (Origins)*.

- **Chapter 3: The Constellation of Us (Story Timeline)**
  - Stardust timeline spine with metric counters (*Days Entwined*, *Midnight Whispers*, *Shared Umbrella*, *Infinite Wishes*).
  - Chronological relationship milestones (Genesis cafe, 3 AM late-night calls, Southbank rain, Today's Birthday milestone).
  - Interactive audio snippet player on each milestone with animated sound bars.
  - Photo zoom lightbox and handwritten keepsake notes.

- **Chapter 4: A Letter From My Heart (Handwritten Truths)**
  - 3D styled vintage parchment envelope with crimson wax seal.
  - Touch the seal to unfold the letter onto warm parchment paper with pressed flora sketches.
  - **Live Letter Editor**: edit paragraphs directly to personalize your message.
  - **Print Keepsake Copy**: print or save as a pristine styled PDF.
  - Re-seal button to experience the unsealing anytime.

- **Chapter 5: Why You Are My World (The Celestial Ledger)**
  - 3D perspective flip cards with smooth Y-axis rotations.
  - 6 heartwarming traits: *Your Smile*, *Your Kindness*, *Ordinary Days Made Special*, *Your Voice*, *Your Dreams*, and *Your Little Quirks*.
  - Real-time reveal counter (`X / 6 Revealed`).
  - Personalize button on every card to rewrite or customize any note.

- **Chapter 6: The Birthday Candle (The Celestial Ritual)**
  - Decadent artisanal dark chocolate cake with realistic candle and flickering flame.
  - **✨ Make a Wish & Blow Out Candle ✨**:
    - Extinguishes the flame with starry smoke puff.
    - Triggers multi-stage romantic confetti and stardust explosion.
    - Plays celestial celebratory chimes.
    - Unveils the celebratory banner with a customizable parchment wish note and copy button.
    - Relight button to repeat the magical ritual.

- **Chapter 7: Final Secret Message (The Final Horizon)**
  - Poetic display typography: *"If I could give you one thing in life, it would be the ability to see yourself through my eyes."*
  - **Sealed Eternal Vow Modal**: *"You will always have a special place in my universe. ❤️"*
  - **Download Memory Book**: Exports the full text and memories as an archival keepsake file.
  - Copy Keepsake URL with instant notification toast.

- **🎧 Embedded Web Audio API Celestial Synthesizer**
  - Zero external MP3 dependency issues: pure Web Audio API synthesis generating warm pentatonic piano chimes, gentle harmonics, and bass resonance.
  - Persistent bottom audio player with track title, tags, play/pause, prev/next, loop, interactive scrubber, volume bar, and synchronized sound wave animation.

---

## 📁 Project Architecture & Folder Structure

```
Surprise/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── AudioPlayer.jsx         # Persistent floating bottom audio pill player
│   │       ├── Footer.jsx              # Bottom brand and navigation footer
│   │       ├── Header.jsx              # Sticky top header with chapter pills & mobile menu
│   │       └── ParticleBackground.jsx  # Atmospheric starfield & nebulae SVG backdrop
│   ├── context/
│   │   ├── AudioContext.jsx            # React context for ambient audio synthesis
│   │   └── SurpriseContext.jsx         # Context for chapters, persistence, and customization
│   ├── data/
│   │   ├── audioSynthesizer.js         # Web Audio API engine (sine/triangle oscillators & filters)
│   │   └── defaultData.js              # Content store (milestones, memories, letter, reasons)
│   ├── pages/
│   │   ├── WelcomePage.jsx             # Chapter 1: Secret Welcome Screen & Wax Seal
│   │   ├── MemoriesPage.jsx            # Chapter 2: Polaroid Scrapbook & Lightbox
│   │   ├── StoryTimelinePage.jsx       # Chapter 3: Glowing Story Timeline & Milestones
│   │   ├── LetterPage.jsx              # Chapter 4: Unfolding Wax-Sealed Letter
│   │   ├── WhyYouPage.jsx              # Chapter 5: 3D Flip Keepsake Reason Cards
│   │   ├── BirthdayWishPage.jsx        # Chapter 6: Birthday Cake & Candle Ritual
│   │   └── FinalStarlightPage.jsx      # Chapter 7: Final Secret Vow & Keepsake Export
│   ├── styles/
│   │   └── index.css                   # Tailwind directives, animations & print styles
│   ├── App.jsx                         # Main app container & chapter router
│   └── main.jsx                        # React root entry point
├── stitch_raw/                         # Downloaded original Stitch screens & design system
├── index.html                          # HTML shell with Google Fonts & Material Symbols
├── package.json                        # Scripts & dependencies
├── postcss.config.js                   # PostCSS configuration
├── tailwind.config.js                  # Stitch Nocturne & Stardust design tokens
├── vite.config.js                      # Vite build configuration
└── README.md                           # Documentation
```

---

## 🚀 Running the Project

### 1. Development Mode
To start the live development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 2. Production Build
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🎨 Customizing for Your Partner

1. **Change Partner Name**:
   - Simply click on her name directly on the **Welcome Screen** to edit it in place.
   - Or modify `partnerName` in [`src/data/defaultData.js`](file:///c:/Users/omvin/Desktop/Surprise/src/data/defaultData.js).

2. **Add Your Own Photos**:
   - Click **"Add Snapshot"** in the Memories tab to add any image from your computer or web URL.
   - Or replace the URLs in [`src/data/defaultData.js`](file:///c:/Users/omvin/Desktop/Surprise/src/data/defaultData.js).

3. **Edit the Love Letter**:
   - Open Chapter 4 and click **"Edit Letter"** to edit the salutation, paragraphs, or signature.
   - Click **"Print Keepsake Copy"** to export as a physical card or PDF.
