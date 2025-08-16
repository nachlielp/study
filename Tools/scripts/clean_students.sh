#!/usr/bin/env bash
# clean_students.sh
# Usage:  ./clean_students.sh            # works in the current directory
#         ./clean_students.sh  /path/to/root_with_students

set -euo pipefail

# include dot-files when expanding globs
shopt -s dotglob nullglob

root_dir="${1:-.}"          # first arg or current directory
echo "Root directory: $root_dir"
echo

for student in "$root_dir"/*/; do
  # Path to the Exercise-Runner folder
ex_dir="${student}Lesson1-8-IntroToJS/Exercise-Runner"
  # Skip if it does not exist
  if [[ ! -d $ex_dir ]]; then
    echo "⚠️  Skipping: $student  (Exercise-Runner not found)"
    continue
  fi

  echo "Cleaning: $student"

  # 1) Copy Exercise-Runner’s contents to a temp dir
  tmp=$(mktemp -d)
  cp -a -- "$ex_dir"/. "$tmp"/

  # 2) Delete everything in the student folder
  rm -rf -- "${student:?}"/*

  # 3) Restore only Exercise-Runner’s contents
  cp -a -- "$tmp"/. "$student"

  # 4) Remove the temp dir
  rm -rf -- "$tmp"
done

echo
echo "✅  Finished.  Each student folder now contains only the original"
echo "   Exercise-Runner contents."