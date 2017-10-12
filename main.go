package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
)

func writeError(w http.ResponseWriter, message string, code int) {
	response, _ := json.Marshal(map[string]string{"error": message})
	w.WriteHeader(code)
	w.Write(response)
}

func internalError(w http.ResponseWriter) {
	writeError(w, "an internal error occurred", http.StatusInternalServerError)
}

func getItem(w http.ResponseWriter, host, port, selector string) *bytes.Buffer {
	log.Printf("Dialing %s:%s for selector '%s'\n", host, port, selector)
	conn, err := net.Dial("tcp", host+":"+port)

	if err != nil {
		log.Println("Error:", err)
		writeError(w, err.Error(), http.StatusBadRequest)
		return nil
	}

	fmt.Fprintf(conn, "%s\r\n", selector)

	buffer := new(bytes.Buffer)
	_, err = buffer.ReadFrom(conn)

	if err != nil {
		log.Println("Error reading from connection at",
			host+":"+port,
			fmt.Sprintf("with selector %s:", selector),
			err)
		internalError(w)
		return nil
	}

	return buffer
}

func readDirectory(response []byte) ([]*Item, bool) {
	scanner := bufio.NewScanner(bytes.NewReader(response))
	items := make([]*Item, 0)

	for scanner.Scan() {
		text := scanner.Text()
		if text == "." {
			break
		}
		item, err := parseItem(text)
		if err != nil {
			log.Printf("Error parsing item from %q: %s\n", text, err)
			return nil, true
		} else {
			items = append(items, item)
		}
	}

	return items, false
}

func writeDirectory(
	w http.ResponseWriter, host, port, selector string, items []*Item,
) {
	log.Println("Returning", len(items), "items")

	response, err := json.Marshal(map[string]interface{}{
		"data":     items,
		"host":     host,
		"port":     port,
		"selector": selector,
		"type":     itemTypeNames[DIRECTORY],
	})
	if err != nil {
		log.Println("Error marshalling directory response:", err)
		internalError(w)
		return
	}

	w.Write(response)
}

func sendDirectoryOrError(
	w http.ResponseWriter, host, port, selector string, response *bytes.Buffer,
) {
	if items, errors := readDirectory(response.Bytes()); !errors {
		writeDirectory(w, host, port, selector, items)
	} else {
		internalError(w)
	}
}

func sendTextFileOrError(
	w http.ResponseWriter, host, port, selector string, response *bytes.Buffer,
) {
	marshalled, err := json.Marshal(map[string]string{
		"data":     response.String(),
		"host":     host,
		"port":     port,
		"selector": selector,
		"type":     itemTypeNames[TEXT_FILE],
	})
	if err != nil {
		log.Println("Error marshalling text file response:", err)
		internalError(w)
		return
	}

	w.Write(marshalled)
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	host := r.URL.Query().Get("host")
	if host == "" {
		writeError(w, "must supply host", http.StatusBadRequest)
		return
	}
	port := r.URL.Query().Get("port")
	if port == "" {
		port = "70"
	}
	selector := r.URL.Query().Get("selector")
	itemType := r.URL.Query().Get("type")

	response := getItem(w, host, port, selector)
	if response == nil {
		return
	}

	if itemType == "" {
		// No type was given in the request, so try parsing it as a directory
		// listing. If that fails, assume it's a text file.
		if items, errors := readDirectory(response.Bytes()); !errors {
			writeDirectory(w, host, port, selector, items)
		} else {
			sendTextFileOrError(w, host, port, selector, response)
		}
	} else if itemType == itemTypeNames[DIRECTORY] {
		sendDirectoryOrError(w, host, port, selector, response)
	} else if itemType == itemTypeNames[TEXT_FILE] {
		sendTextFileOrError(w, host, port, selector, response)
	} else {
		log.Println("Unrecognized item type requested:", itemType)
	}
}

func main() {
	port := ":8080"
	http.Handle("/", http.FileServer(http.Dir("public")))
	http.HandleFunc("/api/", handler)
	log.Printf("Listening on http://127.0.0.1%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Println("Server stopped:", err)
	}
}
