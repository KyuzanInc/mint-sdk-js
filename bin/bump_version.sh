#!/bin/bash

LOCAL_VERSION=`node -e "console.log(require('./package.json').version)"`
REMOTE_VERSION=`npm view "" dist-tags.latest || echo`
if [ "$LOCAL_VERSION" = "$REMOTE_VERSION" ]; then
  npm version patch -m "Bump version to %s by Github Action"
else
  git tag -m "Bump version to $LOCAL_VERSION by Github Action" "v$LOCAL_VERSION"
fi
git push --tags main