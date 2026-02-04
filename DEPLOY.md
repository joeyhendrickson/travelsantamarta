# Deploy to Vercel (Push → Deploy)

**Production URL:** https://travel-santa-marta-agent-joey-hendricksons-projects.vercel.app/

## Push to GitHub → Auto-deploy to Vercel

1. **Connect the repo in Vercel** (one-time):
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Open your project (e.g. **travel-santa-marta**)
   - **Settings** → **Git**
   - Under **Connected Git Repository**, confirm it shows:
     - **Repository:** `joeyhendrickson/travelsantamarta` (or your GitHub repo)
     - **Production Branch:** `main`
   - If it says "No Git Repository connected", click **Connect Git Repository** and choose the GitHub repo. Vercel will then deploy on every push to `main`.

2. **Deploy on push:**
   - From your project: `git push origin main`
   - Vercel will build and deploy. Check **Deployments** in the Vercel project for status.

3. **Production env vars:**
   - In Vercel: **Settings** → **Environment Variables**
   - Set **GOOGLE_REDIRECT_URI** and **NEXT_PUBLIC_APP_URL** to the production URL:
     - `GOOGLE_REDIRECT_URI` = `https://travel-santa-marta-agent-joey-hendricksons-projects.vercel.app/api/auth/google/callback`
     - `NEXT_PUBLIC_APP_URL` = `https://travel-santa-marta-agent-joey-hendricksons-projects.vercel.app`
   - In **Google Cloud Console** → your OAuth client → **Authorized redirect URIs**, add:
     - `https://travel-santa-marta-agent-joey-hendricksons-projects.vercel.app/api/auth/google/callback`

See [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md) for the full list of environment variables.
