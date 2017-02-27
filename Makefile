WEBPACK=./node_modules/.bin/webpack
ELECTRON=./node_modules/.bin/electron

start:
	$(ELECTRON) .

watch:
	$(WEBPACK) --colors --watch

build:
	$(WEBPACK) --production

usage:
	@echo start: run the app
	@echo watch: compile the app in dev mode and watch for changes
	@echo build: compile the app in production mode
