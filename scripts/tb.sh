#!/bin/bash

set -e

CONTROL_URL=file://$PWD/dist/index.html
EXPERIMENT_URL=file://$PWD/dist/index.html


echo "tracerbench compare --controlURL $CONTROL_URL --experimentURL $EXPERIMENT_URL"
RESULTS=$(tracerbench compare --controlURL $CONTROL_URL --experimentURL $EXPERIMENT_URL)

echo "$RESULTS"