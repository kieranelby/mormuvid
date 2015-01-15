#!/bin/sh
git rm --ignore-unmatch -rf dist && grunt build && git add dist
