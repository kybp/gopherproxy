package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
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

func addItem(items []*Item, newItem *Item) []*Item {
	length := len(items)

	if length == cap(items) {
		newItems := make([]*Item, (length+1)*2)
		copy(newItems, items)
		items = newItems
	}

	items = items[0 : length+1]
	items[length] = newItem

	return items
}

func readDirectory(conn net.Conn) ([]*Item, bool) {
	scanner := bufio.NewScanner(conn)
	items := make([]*Item, 0)

	for scanner.Scan() {
		text := scanner.Text()
		item, err := parseItem(text)
		if err != nil {
			log.Printf("Error parsing item from %q: %s\n", text, err)
			return nil, true
		} else {
			items = addItem(items, item)
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
	conn, err := net.Dial("tcp", host+":"+port)

	if err != nil {
		writeError(w, err.Error(), http.StatusBadRequest)
		fmt.Fprintf(w, "Error: %s\n", err)
		return nil
	}

	fmt.Fprintf(conn, "%s\r\n", selector)
	return conn
}

func readPostBody(r *http.Request) (map[string]string, error) {
	n := r.ContentLength
	post := make(map[string]string)

	if n > 0 {
		buffer := make([]byte, r.ContentLength)
		_, err := r.Body.Read(buffer)

		if err != nil && err != io.EOF {
			log.Printf("Error reading request body: %s\n", err)
			return nil, err
		}

		if err := json.Unmarshal(buffer, &post); err != nil {
			log.Printf("Error parsing request body: %s\n", err)
			return nil, err
		}
	}

	return post, nil
}

func sendTextFile(w http.ResponseWriter, host, port, selector string) {
	w.Header().Set("Content-Type", "text/plain")

	conn := getItem(w, host, port, selector)
	if conn == nil {
		return
	}

	buffer := make([]byte, 0x1000)
	reader := bufio.NewReader(conn)

	for {
		n, err := reader.Read(buffer)
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Printf("Error reading file: %s\n", err)
			internalError(w)
			return
		}

		w.Write(buffer[0:n])
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	post, err := readPostBody(r)
	if err != nil {
		internalError(w)
		return
	}

	host := post["host"]
	if host == "" {
		writeError(w, "must supply host", http.StatusBadRequest)
		return
	}
	port := post["port"]
	if port == "" {
		port = "70"
	}
	selector := post["selector"]

	conn := getItem(w, host, port, selector)
	if conn == nil {
		return
	}

	items, errors := readDirectory(conn)

	if errors {
		sendTextFile(w, host, port, selector)
	} else {
		response, err := json.Marshal(items)
		if err != nil {
			log.Printf("Error marshalling items: %s\n", err)
			internalError(w)
			return
		}

		w.Write(response)
	}
}

func main() {
	port := ":8080"
	http.HandleFunc("/", handler)
	fmt.Printf("\nListening on http://127.0.0.1%s\n", port)
	http.ListenAndServe(port, nil)
}
