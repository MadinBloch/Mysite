# Madin Bloch — Portfolio

Personal portfolio website built with **React + Vite + Tailwind CSS**.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Fixed top navigation
│   ├── Hero.jsx          # Home / landing section
│   ├── About.jsx         # About me section
│   ├── Skills.jsx        # Skills with honest labels
│   ├── Projects.jsx      # Filterable project cards
│   ├── DevOps.jsx        # DevOps work & config
│   ├── Hackathon.jsx     # Hackathon experience
│   ├── Blogs.jsx         # Hashnode API blog posts
│   ├── YouTube.jsx       # YouTube videos section
│   ├── Community.jsx     # Events + What I'm doing now
│   └── Contact.jsx       # Contact links + footer
├── data/
│   └── projects.json     # All project data
├── App.jsx
├── main.jsx
└── index.css
```

---

## ✏️ Customisation

### Update your info
- **Email / LinkedIn**: Edit `src/components/Contact.jsx`
- **Projects**: Edit `src/data/projects.json`
- **Intro text**: Edit `src/components/Hero.jsx` and `About.jsx`

### Add Hackathon media
In `src/components/Hackathon.jsx`, replace the placeholder divs with:
```jsx
<iframe
  width="100%"
  height="100%"
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="Hackathon Project"
  allowFullScreen
/>
```
And replace the certificate placeholder with:
```jsx
<img src="/images/certificate.jpg" alt="Certificate" className="rounded w-full" />
```
Place images in the `public/images/` folder.

### Enable YouTube API (live videos)
1. Get a YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com/)
2. Create a `.env` file in the root:
   ```
   VITE_YOUTUBE_API_KEY=your_key_here
   VITE_YOUTUBE_CHANNEL_ID=your_channel_id_here
   ```
3. Update `src/components/YouTube.jsx` to fetch from:
   ```
   https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet&order=date&maxResults=6&type=video
   ```

### Profile Image
Add your photo to `public/images/profile.jpg` and use it in `Hero.jsx`:
```jsx
<img src="/images/profile.jpg" alt="Madin Bloch" className="w-24 h-24 rounded-full object-cover" />
```

---

## 🌐 Deploy on Vercel

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Deploy — done.

---

## 🎨 Design

- **Dark theme** — zinc-950 base
- **Accent** — emerald green (`#6ee7b7`)
- **Fonts** — Syne (display), DM Sans (body), JetBrains Mono (code)
- No fake skill bars, no heavy animations
