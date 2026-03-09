# Directus CMS — Deployment & Setup Guide

## Step 1 — Deploy Directus on Railway.app (Recommended, free to start)

### 1.1  Create a Railway account
Go to [railway.app](https://railway.app) and sign in with GitHub.

### 1.2  Deploy Directus
1. Click **+ New Project**
2. Search for **Directus** in the template gallery
3. Click **Deploy** — Railway auto-provisions:
   - A Node.js container running Directus
   - A PostgreSQL database
4. Once deployed, click the **domain** button → Railway gives you a URL like:
   `https://directus-xyz.up.railway.app`

### 1.3  First login
- URL: `https://your-directus.up.railway.app`
- Email: `admin@example.com`
- Password: (set by Railway env var `ADMIN_PASSWORD` — change it immediately)

---

## Step 2 — Create Collections (Database Tables)

### Option A: Import from schema file (fastest)
1. In Directus: go to **Settings → Schema → Import**
2. Upload `cms/directus-schema/collections.json`
3. Click **Apply** — all tables and fields are created automatically

### Option B: Manual (if import fails)
Create each collection manually:

**blog_posts** collection with fields:
- `slug` (String, Unique)
- `language` (String, dropdown: en/bn)
- `pairId` (String)
- `status` (String, dropdown: published/draft/scheduled)
- `title` (String)
- `category` (String, dropdown)
- `publishedDate` (Date)
- `metaTitle`, `metaDescription`, `keywords`, `heroIntro` (String/Text)
- `toc`, `sections`, `faqs`, `relatedServiceLinks` (JSON)
- `featuredImage` (File relation)
- `canonicalUrl`, `ogTitle`, `ogDescription` (String)

**services** — same structure from `collections.json`

**site_settings** — Set as **Singleton** in collection options

**homepage_content** — Set as **Singleton**

---

## Step 3 — Import Your Content

### 3.1  Run migration scripts
```bash
# In your project root:
node --experimental-vm-modules cms/migrate-posts.js
node --experimental-vm-modules cms/migrate-services.js
```

This creates files in `cms/data/`:
- `blog_posts_all.json` — all EN + BN posts
- `services.json` — all service page data

### 3.2  Import into Directus
**Option A: Via Admin UI**
1. Go to **Content → blog_posts**
2. Click the ⋮ menu → **Import**
3. Upload `cms/data/blog_posts_all.json`
4. Repeat for `services.json` → **Content → services**

**Option B: Via API (for large datasets)**
```bash
curl -X POST https://your-directus.railway.app/items/blog_posts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d @cms/data/blog_posts_all.json
```

### 3.3  Manually fill site_settings
Go to **Content → site_settings** and fill in:
- Call number: `+8801712655546`
- WhatsApp number: `8801955802007`
- Chamber address: `Mantrust Nazma Monzil, Sector 12, Uttara West, Dhaka-1230`
- etc.

---

## Step 4 — Create API Token

1. In Directus: **Settings → Access Policies → New Policy**
2. Name: `Website Read`
3. Permissions:
   - `blog_posts` → Read (published only)
   - `services` → Read (published only)
   - `site_settings` → Read
   - `homepage_content` → Read
   - `directus_files` → Read
4. **Settings → Access Tokens → New Token**
5. Assign `Website Read` policy
6. Copy the token

---

## Step 5 — Connect Your React Site

### 5.1  Create `.env` file
```bash
# Copy the example:
cp .env.example .env
```

Edit `.env`:
```
VITE_DIRECTUS_URL=https://your-directus.railway.app
VITE_DIRECTUS_TOKEN=your-token-from-step-4
```

### 5.2  Install the Directus SDK (already done)
```bash
npm install @directus/sdk
```

### 5.3  Restart dev server
```bash
npm run dev
```

The site will now fetch blog posts and services from Directus.
Static JS data files remain as automatic fallback.

---

## Step 6 — Verify Everything Works

Open these pages and confirm they load correctly:
- [ ] `/blog` — shows all blog posts
- [ ] `/blog/bail-process-bangladesh` — single post page
- [ ] `/bn/blog` — Bangla blog posts
- [ ] `/services/criminal-lawyer` — service page
- [ ] `/` — homepage

---

## Step 7 — Configure Scheduled Publishing (Optional)

1. In Directus: **Settings → Flows → + New Flow**
2. Trigger: **Schedule** (e.g. every hour: `0 * * * *`)
3. Action: **Run Script**
4. Script:
   ```js
   // Publish any posts where scheduledDate <= now and status = scheduled
   const posts = await $directus.items('blog_posts').readByQuery({
     filter: {
       status: { _eq: 'scheduled' },
       scheduledDate: { _lte: new Date().toISOString() }
     }
   });
   for (const post of posts.data) {
     await $directus.items('blog_posts').updateOne(post.id, { status: 'published' });
   }
   ```
5. Add a **Webhook** action after → points to your Netlify/Vercel deploy hook URL

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `CORS error` | In Directus Settings → CORS → add your site URL |
| Posts not showing | Check `status = published` in Directus |
| Images not loading | Check Directus Files permissions (Read = public) |
| Site shows old data | Clear browser cache or check `.env` VITE_DIRECTUS_URL |
| Build fails | Run `npm run build` — check console for import errors |

---

## Environment Variables Summary

| Variable | Required | Description |
|---|---|---|
| `VITE_DIRECTUS_URL` | Yes (when live) | Your Directus instance URL |
| `VITE_DIRECTUS_TOKEN` | Recommended | Public read-only API token |

When `VITE_DIRECTUS_URL` is empty → app uses static JS data (works in local dev).

---

## Cost Summary

| Service | Cost |
|---|---|
| Railway.app (Directus + DB) | ~$5/month (Hobby plan) or free trial |
| Netlify/Vercel (Frontend) | Free tier |
| **Total** | **~$5/month** |
