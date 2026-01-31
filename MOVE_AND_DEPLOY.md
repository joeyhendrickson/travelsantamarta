# Move Project and Deploy Instructions

## Step 1: Move the Directory

Run these commands in your terminal:

```bash
# Navigate to Projects directory
cd "/Users/josephhendrickson/Code Local Storage/Projects"

# Create Projects directory if it doesn't exist
mkdir -p "Code Local Storage/Projects"

# Create Travel Santa Marta directory
mkdir -p "Code Local Storage/Projects/Travel Santa Marta"
```

## Step 2: Verify the Move

```bash
# Navigate to the new location
cd "Code Local Storage/Projects/Travel Santa Marta"

# Verify package.json exists
ls -la package.json

# Check git status
git status

# Verify remote is still connected
git remote -v
```

## Step 3: Push to GitHub

```bash
# Make sure you're in the project directory
cd "/Users/josephhendrickson/Code Local Storage/Projects/Travel Santa Marta"

# Add any changes (moving doesn't change git, but good to check)
git add .

# Commit if there are any changes
git commit -m "Update project location to Travel Santa Marta"

# Push to GitHub
git push origin main
```

## Step 4: Redeploy in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `travel-santa-marta`
3. Go to **Deployments** tab
4. Click **"..."** on your latest deployment
5. Click **"Redeploy"**

OR trigger a new deployment by:

1. Go to **Settings** → **Git**
2. Click **"Redeploy"** or wait for automatic deployment from the GitHub push

## Notes

- Moving the directory locally doesn't affect GitHub or Vercel
- Git tracks files by content, not location
- The GitHub repository URL stays the same
- Vercel will automatically detect the push and redeploy (if auto-deploy is enabled)
