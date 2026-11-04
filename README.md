# 🕊️ David & Monica – Digital Wedding Invitation Website

> *"The Lord has made everything beautiful in its time."* — Ecclesiastes 3:11

A premium, elegant, mobile-first Christian digital wedding invitation website designed and developed for the holy matrimony of **David Anto Viagul & Monica Merlin** on **Sunday, 29 November 2026** in Dindigul, Tamil Nadu, India.

---

## 💍 Confirmed Wedding Information

* **Groom:** David Anto Viagul
* **Bride:** Monica Merlin
* **Wedding Date:** Sunday, 29 November 2026
* **Wedding Ceremony:**
  * **Church:** Seven Dolour's Church
  * **Location:** Mettupatti, Dindigul, Tamil Nadu, India
  * **Time:** 10:30 AM – 11:45 AM
  * **Date:** 29 November 2026
  * **Google Maps:** [Directions to Seven Dolour's Church](https://www.google.com/maps/search/?api=1&query=Seven+Dolours+Church+Mettupatti+Dindigul+Tamil+Nadu)
* **Wedding Reception:**
  * **Venue:** Sowrastra Sabai, Nootrandu Vizha Mahal
  * **Location:** Bharathipuram, Dindigul, Tamil Nadu, India
  * **Date:** 29 November 2026
  * **Reception Time:** *Time to be announced* (Schedule will be updated shortly)
  * **Google Maps:** [Directions to Sowrastra Sabai Mahal](https://www.google.com/maps/search/?api=1&query=Sowrastra+Sabai+Nootrandu+Vizha+Mahal+Bharathipuram+Dindigul+Tamil+Nadu)
* **Sacred Bible Verse:**
  * *"The Lord has made everything beautiful in its time."* — Ecclesiastes 3:11

---

## 🎨 Design Direction & Color Palette

* **Primary Background:** Warm Ivory / Cream (`#FFF7EC`)
* **Secondary Background:** Champagne Cream (`#F5E6D2`)
* **Primary Accent:** Antique Gold (`#C49A55` / `#E5C378` / `#8E6928`)
* **Secondary Accent:** Burgundy / Wine Red (`#8E302A` / `#5E1D19`)
* **Typography & Body Text:** Deep Brown (`#654132`)
* **Aesthetic:** Luxury physical Christian wedding card feel, Cathedral arches, delicate botanical gold filigree, wax seal, warm parchment textures, and Roman serif titles.

---

## ✨ Features & Interactive Sections

1. **Section 1: 3D Animated Envelope Opening**
   * Luxury ivory envelope with gold corner ornaments and an embossed **D & M** gold wax seal.
   * Clicking *"Open Invitation"* or the wax seal unseals the flap in 3D perspective (`rotateX(180deg)`), slides the inner gold-trimmed card upward, and smoothly reveals the invitation.
   * Includes a *"Skip to Invitation"* button for instant access.
   * *"View Envelope Opening Again"* action in the footer.

2. **Section 2: Hero Section – Couple Introduction**
   * Majestic *"Celebrate Our Love"* heading.
   * Cathedral arch-shaped couple portrait frame with double gold borders and floral accents.
   * Calligraphic script typography for couple names and illuminated ampersand.
   * Sunday, 29 November 2026 gold ribbon.
   * Ambient floating gold particles and soft petals canvas (60fps, low battery drain).

3. **Section 3: Sacred Bible Verse**
   * Ecclesiastes 3:11 presented in an ornamental parchment card with a delicate gilded Christian cross illustration and botanical divider.

4. **Section 4: Live IST Countdown Timer**
   * Real-time countdown to **29 November 2026, 10:30 AM IST** (Asia/Kolkata).
   * Updates every second with Days, Hours, Minutes, and Seconds.
   * Displays an appropriate wedding celebration message when the ceremony arrives.

5. **Section 5: The Wedding Ceremony Card**
   * Seven Dolour's Church, Mettupatti, Dindigul (10:30 AM – 11:45 AM).
   * Custom architectural church stained-glass illustration.
   * Calendar, clock, and location icons.
   * **Get Directions** button that opens Google Maps with the confirmed church coordinates.
   * **Add to Calendar** button (generates `.ics` download for Apple/Outlook and Google Calendar link).

6. **Section 6: The Wedding Reception Card**
   * Sowrastra Sabai, Nootrandu Vizha Mahal, Bharathipuram, Dindigul.
   * Clearly displays *"Time to be announced"*.
   * Grand celebration banquet chandelier illustration.
   * Google Maps directions button and Calendar bookmarking.

7. **Section 7: Couple Photo Gallery & Lightbox**
   * Responsive masonry/grid layout with rounded ornamental gold-bordered frames.
   * Smooth hover zoom animations.
   * Click-to-expand modal lightbox with high-resolution viewing, previous/next controls, keyboard navigation (Escape, Left/Right arrows), and mobile touch-swipe gesture support.

8. **Ambient Wedding Hymn / Harp Synthesizer**
   * Peaceful, gentle arpeggio progression based on Canon in D / Christian hymn chords.
   * Uses Web Audio API — zero external MP3 file download required, 100% offline and bug-free.
   * Floating toggle button with animated soundwave visualizer.

9. **Interactive Blessings & Wishes Guestbook**
   * Guests can write their heartfelt congratulations, prayers, and attendance status.
   * Stored persistently in `localStorage`.
   * Celebratory golden confetti burst upon sending!

10. **WhatsApp Sharing Integration**
    * One-tap *"Share on WhatsApp"* button pre-populating an elegant invitation text with direct link for easy family sharing.

---

## 📂 Project Structure

```
d:\anto\
├── index.html                           # Master invitation website
├── server.js                             # Zero-dependency local development server
├── package.json                         # Project metadata and run scripts
├── README.md                            # Documentation and deployment guide
├── css/
│   ├── style.css                        # Theme variables, typography, responsive layout
│   ├── envelope.css                     # 3D envelope opening animation and wax seal
│   ├── animations.css                   # Gold shimmer, floating particles, scroll reveals
│   └── components.css                   # Event cards, countdown, lightbox, guestbook
├── js/
│   ├── main.js                          # Navigation, scroll reveals, toast, WhatsApp share
│   ├── envelope.js                      # 3D flap flip, seal break, skip logic
│   ├── countdown.js                     # Live 1-second IST timer to 29 Nov 2026
│   ├── particles.js                     # Canvas ambient gold dust and soft rose petals
│   ├── music.js                         # Web Audio API sacred harp/piano player
│   ├── calendar.js                      # .ICS calendar generator and Google Calendar URL
│   ├── gallery.js                       # Lightbox modal with swipe and keyboard controls
│   └── guestbook.js                     # Wishes submission, localStorage and confetti
└── assets/
    └── images/
        ├── couple-hero.svg              # Fallback Cathedral arch couple portrait
        ├── church-illustration.svg       # Seven Dolour's Church illustration
        ├── reception-illustration.svg    # Sowrastra Sabai celebration hall illustration
        ├── cross-gold.svg               # Christian ornamental gold cross
        ├── gold-seal.svg                # D & M wax seal monogram
        ├── floral-corner.svg            # Antique gold corner filigree
        ├── floral-divider.svg           # Botanical gold divider
        ├── textures/
        │   └── parchment.svg            # Subtle luxury paper texture
        └── couple/                      # Photo gallery collection
            ├── photo1.svg to photo6.svg
            └── README.md                # Guide on adding David & Monica's photos
```

---

## 🚀 How to Run the Website Locally

### Option 1: Instant Browser Launch (Zero Installation)
Simply double-click `index.html` or drag it into any web browser (Chrome, Safari, Edge, Firefox). Everything runs completely client-side without any server needed!

### Option 2: Using Node.js
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: Using Python
```bash
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 How to Add David & Monica's Real Photographs

1. **Hero Couple Portrait:**
   * Place the high-resolution photo in `assets/images/couple-hero.jpg` (or `.png` / `.webp`).
   * The website automatically detects the photo and fades it into the Cathedral arch frame.

2. **Gallery Photos:**
   * Place up to 6 photographs as:
     * `assets/images/couple/photo1.jpg`
     * `assets/images/couple/photo2.jpg`
     * `assets/images/couple/photo3.jpg`
     * `assets/images/couple/photo4.jpg`
     * `assets/images/couple/photo5.jpg`
     * `assets/images/couple/photo6.jpg`
   * The gallery automatically swaps the illustrations for the photographs.

---

## 🌐 Deploying Online (Free & Instant)

To share the link on WhatsApp with wedding guests:

* **Netlify / Vercel:** Drag and drop the `d:\anto` folder directly into Netlify Drop ([app.netlify.com/drop](https://app.netlify.com/drop)). It goes live with a custom URL in under 10 seconds!
* **GitHub Pages:** Push the repository to GitHub and enable GitHub Pages in Settings &rarr; Pages &rarr; Branch: `main` / `root`.
