#!/bin/bash

SIZE_THRESHOLD_KB="${1:-10}"
for directory in `find ***REMOVED***/components -type d -depth 1`
do
    printf "\n-----------\nDirectory: $directory\n-----------\n"
    num_of_files_in_dir=$(find $directory -type f | wc -l)
    printf "Number of files: $num_of_files_in_dir\n"
    large_files=$(find $directory -type f -name "*.js" ! -path "src/.next/*" -size +${SIZE_THRESHOLD_KB}k)
    if [ ! -z "$large_files" ]
    then
      echo "Files larger than ${SIZE_THRESHOLD_KB}kb:"
      for file in $large_files
      do
        ls -lah $file | awk '{print $5, $9}'
      done
    fi
done
