#!/bin/bash

DIR=$KG_PROJECT_DIR

rm ${DIR}/backend/web/css/*
rm ${DIR}/backend/web/js/*
rm ${DIR}/backend/web/images/*
cp dist/js/* ${DIR}/backend/web/js/
cp dist/css/* ${DIR}/backend/web/css/
cp dist/images/* ${DIR}/backend/web/images

SRC='dist/index.html'
TGT=${DIR}/backend/views/layouts/vue.php

TO=$(grep -o 'style-.*css' ${SRC})
FROM=$(grep -o 'style-.*css'  ${TGT})
sed -i s/${FROM}/${TO}/g ${TGT}


TO=$(grep -o 'index-.*js' ${SRC})
FROM=$(grep -o 'index-.*js'  ${TGT})
sed -i s/${FROM}/${TO}/g ${TGT}


