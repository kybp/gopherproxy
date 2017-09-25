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

$(PUBLIC)/$(JS_BUNDLE): $(FE)/node_modules $(TS_SRC)/index.tsx
	./$(FE)/node_modules/.bin/webpack \
		--config $(FE)/webpack.config.js \
		--context $(FE) \
		--env.tsconfig=$(FE)/tsconfig.json \
		--env.outDir=$(shell pwd)/public

watch: backend frontend
	./$(SERVER_BIN) & \
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