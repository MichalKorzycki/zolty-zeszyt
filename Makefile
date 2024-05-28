SOURCEDIR = dist
SLUG = zolty-zeszyt
Z=zopfli -i50
B=brotli -f -k -Z -w 0
SLUG := $(shell python3 cli/slug.py mustacheView.json slug)
PARTNERSLUG := $(shell python3 cli/slug.py mustacheView.json partner_slug)
ICOPATH := $(shell python3 cli/slug.py mustacheView.json icopath)
LOGOPATH := $(shell python3 cli/slug.py mustacheView.json logopath)
D=/usr/share/nginx/html/${SLUG}
.PHONY = deploy all compress build mustache fullbuild spinner
SOURCES := $(shell find $(SOURCEDIR) -name '*.css' -o -name '*.js' -o -name '*.html' -o -name '*.ttf' -o -name '*.svg' -o -name '*.eot' -o -name '*.json')
PNGS := $(shell find $(SOURCEDIR) -name '*.png')
GZTARGETS=$(SOURCES:%=%.gz)
BRTARGETS := $(SOURCES:%=%.br)
PNGTARGETS := $(PNGS:%=%.z)
MINIFY=./node_modules/html-minifier/cli.js --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes  --use-short-doctype --minify-css true --minify-js true
CSSMINIFY=./node_modules/css-minify/bin/css-minify.js
MJ=mustacheView.json



%.gz: %
	 ${Z} $<

%.br: %
	 ${B} $<; touch $@

%.z: %
	 pngquant --skip-if-larger --strip --output $@ "$<"; if [ -f $@ ]; then mv $@ $<; fi;


compress: $(GZTARGETS) $(BRTARGETS) $(PNGTARGETS)
	find ./dist/ -type f -name '*.br' ! -name '*legacy*' ! -name '*workbox*' -exec du -ch {} +

cleardist:
	rm -r dist/*

build:
	nvm use 18 && npm run build

deploy:
	cd dist && cp -r . /usr/share/nginx/html/zoltyzeszyt/
