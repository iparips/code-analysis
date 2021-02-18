#!/bin/bash

SIZE_THRESHOLD_KB="${1:-10}"
for directory in `find src/app/pages/realestateandhomes-detail/components -type d -depth 1`
do
    printf "\n-----------\nDirectory: %s\n-----------\n" "$directory"
    num_of_files_in_dir=$(find "$directory" -type f | wc -l)
    printf "Number of files: %s\n" "$num_of_files_in_dir"
    large_files=$(find "$directory" -type f -name "*.js" ! -path "src/.next/*" -size +"${SIZE_THRESHOLD_KB}"k)
    if [ -n "$large_files" ]
    then
      echo "Files larger than ${SIZE_THRESHOLD_KB}kb:"
      cloc "$large_files"
    fi
done
