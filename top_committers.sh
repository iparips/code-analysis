#!/bin/bash

# set -x

DIR=$1
HINDSIGHT="${2:-3}"

echo -e "Top committers\n--------------"
git shortlog -n -s -- $DIR | head -n"$HINDSIGHT"
echo -e "\n"
echo -e "Last $HINDSIGHT commits\n--------------"
git log -n "$HINDSIGHT" "$GLF" -- $DIR
echo -e "\n"
