# gopherproxy

This is an HTTP [Gopher](https://www.ietf.org/rfc/rfc1436.txt) proxy JSON API
and an SPA for browsing Gopherspace through that API. Currently, only
directory listings and text files are supported.

## Dependencies

* [Google Go](https://golang.org) - Tested with version 1.9
* [Node.js](https://nodejs.org) - Tested with version 7.4.0

## Building

The entire project can be built with `make` in the project root. The following
make targets are also provided:

 * **backend** - Only build the backend
 * **frontend** - Only build the frontend
 * **watch** - Build the frontend, and rebuild when files are modified
 * **test** - Run the test suite
 * **lint** - Lint the frontend sources (also run as part of building them)
 * **clean** - Delete all built files
 * **clean-deps** - Delete the frontend's `node_modules` directory

## Running

Once built, the server can be run with `./gopherproxy`. This will serve the
SPA frontend at `/` and the JSON API at `/api/`. The API accepts GET requests
with the Gopher resource specified as a query string with the following
parameters:

 * **host** - The Gopher host to connect to
 * **port** - The port to make the Gopher request on (defaults to 70)
 * **selector** - The resource selector to send to the Gopher host (defaults to
   the empty string)
 * **type** - The type of the resource being requested (explained below)

All of the parameters except for `host` are optional.

The full list of supported item types can be found in `client.go`. If the
request type is not provided, an attempt will be made to parse the response as
a directory listing; if this attempt fails, the response will be given as a
text file.
