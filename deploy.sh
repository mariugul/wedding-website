#!/bin/bash

# Wedding Website Deploy Script
# Usage: DEPLOY_TARGET=/path/to/folder ./deploy.sh

DEPLOY_TARGET="${DEPLOY_TARGET:-$HOME/wedding-prod}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Deploying to: $DEPLOY_TARGET"

mkdir -p "$DEPLOY_TARGET" || { echo "Error: Cannot create $DEPLOY_TARGET"; exit 1; }

rsync -av --delete \
    --exclude '.git' \
    --exclude '.gitignore' \
    --exclude 'deploy.sh' \
    --exclude '*.md' \
    "$SCRIPT_DIR/" "$DEPLOY_TARGET/" || { echo "Error: rsync failed"; exit 1; }

echo "Done."
