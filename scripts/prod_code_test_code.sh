#!/bin/bash

# Assumption: 'src' directory exists directly under $CODEBASE_DIR
CODEBASE_DIR="$1"

if [ -z "$CODEBASE_DIR" ]; then
  echo "Please put path of codebase under investigation as the first argument of the script.";
  exit 1
else
  echo "CODEBASE_DIR is set to $CODEBASE_DIR";
fi

function test_loc_and_prod_code_loc {
  echo "Sources LOC Count (excluding tests)"
  cloc --not-match-f='.test.js' "$CODEBASE_DIR/src" --quiet --json | jq '.JavaScript'
  echo "Test Code LOC Count"
  cloc --match-f='.test.js' "$CODEBASE_DIR/src" --quiet --json | jq '.JavaScript'
}

# Get dates for last 39 months (the age of the codebase being assessed)
for i in {1..39}; do
    dates="$dates $(date -I -d "2021-02-01 -$i months")"
done

for item in ${dates[*]}
do
  echo "$item"
  pushd "$CODEBASE_DIR"
  echo "git checkout $(git rev-list --before="$item" -n1 master) --quiet"
  git checkout $(git rev-list --before="$item" -n1 master) --quiet
  test_loc_and_prod_code_loc
  popd
done
