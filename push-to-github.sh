#!/bin/bash
# This is a helper script to push your code to your GitHub repository.

echo "Step 1: Adding all changes..."
git add .

echo "Step 2: Committing changes..."
# You can change the commit message below if you want.
git commit -m "Syncing project updates to GitHub"

echo "Step 3: Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Your code has been successfully pushed to GitHub."
