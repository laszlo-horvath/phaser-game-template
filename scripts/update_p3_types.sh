#!/usr/bin/env bash

# phaser type defition
REMOTEURL='https://raw.githubusercontent.com/photonstorm/phaser/v3.23.0/types/phaser.d.ts'
# Please note:
# The reference types="./matter" may need to be updated to path="./matter" inside phaser.d.ts.
DEST=src/typings/phaser.d.ts

curl $REMOTEURL > $DEST

# matter js type defition
REMOTEURL='https://raw.githubusercontent.com/photonstorm/phaser/v3.23.0/types/matter.d.ts'
DEST=src/typings/matter.d.ts

curl $REMOTEURL > $DEST
