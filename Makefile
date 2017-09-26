FE=frontend
TS_SRC=$(FE)/src
PUBLIC=public
JS_BUNDLE=bundle.js
SERVER_BIN=gopherproxy

all: backend frontend

backend: $(SERVER_BIN)

$(SERVER_BIN): client.go main.go
	go build

frontend: lint $(PUBLIC)/$(JS_BUNDLE) $(PUBLIC)/index.html

$(PUBLIC)/$(JS_BUNDLE): $(FE)/node_modules $(TS_SRC)/index.tsx\
                        $(TS_SRC)/actions.ts\
                        $(TS_SRC)/components/App.tsx\
                        $(TS_SRC)/components/Directory.tsx\
                        $(TS_SRC)/components/getStyle.ts\
                        $(TS_SRC)/reducers/index.ts\
                        $(TS_SRC)/reducers/currentItemType.ts\
                        $(TS_SRC)/reducers/directoryItems.ts\
                        $(TS_SRC)/reducers/fontStyle.ts\
                        $(TS_SRC)/reducers/textFile.ts
	./$(FE)/node_modules/.bin/webpack \
		--config $(FE)/webpack.config.js \
		--context $(FE) \
		--env.tsconfig=$(FE)/tsconfig.json \
		--env.outDir=$(shell pwd)/public

watch: frontend
	./$(FE)/node_modules/.bin/webpack --watch \
		--config $(FE)/webpack.config.js \
		--context $(FE) \
		--env.tsconfig=$(FE)/tsconfig.json \
		--env.outDir=$(shell pwd)/public

$(FE)/node_modules:
	cd $(FE) && yarn

$(PUBLIC)/index.html: $(FE)/index.html
	cp $^ $@

test: frontend backend
	go test

lint:
	$(FE)/node_modules/.bin/tslint --project $(FE)

clean:
	rm -rf $(SERVER_BIN) $(PUBLIC)

clean-deps:
	rm -rf $(FE)/node_modules
