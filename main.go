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

func readDirectory(conn net.Conn) ([]*Item, bool) {
	scanner := bufio.NewScanner(conn)
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

func getItem(
	w http.ResponseWriter,
	host string,
	port string,
	selector string,
) net.Conn {
	log.Printf("Dialing %s:%s\n", host, port)
	conn, err := net.Dial("tcp", host+":"+port)

	if err != nil {
		writeError(w, err.Error(), http.StatusBadRequest)
		log.Printf("Error: %s\n", err)
		return nil
	}

	fmt.Fprintf(conn, "%s\r\n", selector)
	return conn
}

func sendTextFile(w http.ResponseWriter, host, port, selector string) {
	w.Header().Set("Content-Type", "text/plain")

	conn := getItem(w, host, port, selector)
	if conn == nil {
		return
	}

	buffer := new(bytes.Buffer)
	_, err := buffer.ReadFrom(conn)

	if err != nil {
		log.Printf("Error reading file: %s\n", err)
		internalError(w)
		return
	}

	buffer.WriteTo(w)
}

func sendDirectoryItems(w http.ResponseWriter, items []*Item) {
	log.Printf("Returning %d items\n", len(items))
	response, err := json.Marshal(items)
	if err != nil {
		log.Printf("Error marshalling items: %s\n", err)
		internalError(w)
		return
	}

	w.Write(response)
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

	conn := getItem(w, host, port, selector)
	if conn == nil {
		return
	}

	if itemType == "" {
		if items, errors := readDirectory(conn); !errors {
			sendDirectoryItems(w, items)
		} else {
			sendTextFile(w, host, port, selector)
		}
	} else if itemType == "DIRECTORY" {
		if items, errors := readDirectory(conn); !errors {
			sendDirectoryItems(w, items)
		} else {
			internalError(w)
		}
	} else if itemType == "TEXT_FILE" {
		sendTextFile(w, host, port, selector)
	}
}

func main() {
	port := ":8080"
	http.Handle("/", http.FileServer(http.Dir("public")))
	http.HandleFunc("/api/", handler)
	log.Printf("Listening on http://127.0.0.1%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Printf("Server stopped: %s\n", err)
	}
}
