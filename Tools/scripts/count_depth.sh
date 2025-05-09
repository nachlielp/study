#!/bin/bash

# Function to recursively count directory depth
count_depth() {
  local dir="$1"
  local current_depth="$2"
  local max_depth="$current_depth" # Initialize max_depth for this level

  # Loop through items in the current directory
  # Use find to handle potential issues with very long paths for listing
  # Add maxdepth 1 to find to only process direct children
  find "$dir" -maxdepth 1 -mindepth 1 -print0 | while IFS= read -r -d '' item; do
    # Check if the item is a directory
    if [[ -d "$item" ]]; then
      # Recursively call count_depth for the subdirectory
      local sub_depth=$(count_depth "$item" $((current_depth + 1)))

      # Update the max_depth for the current level based on subdirectory results
      if [[ "$sub_depth" -gt "$max_depth" ]]; then
        max_depth="$sub_depth"
      fi
    fi
  done

  echo "$max_depth"
}

# --- Main Script ---

# Check if a directory path is provided
if [[ -z "$1" ]]; then
  echo "Usage: $0 <directory_path>"
  exit 1
fi

# Get the starting directory path
start_directory="$1"

# Check if the starting directory exists
if [[ ! -d "$start_directory" ]]; then
  echo "Error: Directory '$start_directory' not found."
  exit 1
fi

# Start the depth counting from the initial directory (depth 0)
initial_depth=0
total_depth=$(count_depth "$start_directory" "$initial_depth")

# The count_depth function now returns the max depth relative to the *starting* directory at depth 0.
# If you want the total number of nested levels *including* the starting directory as level 1,
# you might want to add 1 to total_depth, but for finding the deepest point,
# the value returned by the function is usually what you need.
# Let's stick with the value returned by the function which represents the depth relative to the start.

echo "Maximum directory depth within '$start_directory': $total_depth"
