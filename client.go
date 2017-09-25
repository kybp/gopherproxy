package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"strings"
)

type ItemType byte

const (
	TEXT_FILE = ItemType('0')
	DIRECTORY = ItemType('1')
	INFO      = ItemType('i')
)

type Item struct {
	Type        ItemType `json:"type"`
	Description string   `json:"description"`
	Selector    string   `json:"selector"`
	Host        string   `json:"host"`
	Port        int      `json:"port"`
}

var itemTypeNames = map[ItemType]string{
	TEXT_FILE: "TEXT_FILE",
	DIRECTORY: "DIRECTORY",
	INFO:      "INFO",
}

var itemTypeTypes = make(map[string]ItemType)

func init() {
	for k, v := range itemTypeNames {
		itemTypeTypes[v] = k
	}
}

func (item *Item) MarshalJSON() ([]byte, error) {
	type Alias Item

	typeName := itemTypeNames[item.Type]
	if typeName == "" {
		typeName = "UNKNOWN"
	}

	return json.Marshal(&struct {
		Type string `json:"type"`
		*Alias
	}{
		Type:  typeName,
		Alias: (*Alias)(item),
	})
}

func (item *Item) UnmarshalJSON(data []byte) error {
	type Alias Item
	aux := &struct {
		Type string `json:"type"`
		*Alias
	}{
		Alias: (*Alias)(item),
	}

	if err := json.Unmarshal(data, &aux); err != nil {
		return err
	}

	item.Type = itemTypeTypes[aux.Type]

	return nil
}

func parseItem(line string) (*Item, error) {
	item := Item{}
	parts := strings.Split(line, "\t")

	if len(parts[0]) == 0 {
		return nil, errors.New(fmt.Sprintf("no item type: \"%s\"", line))
	}

	item.Type = ItemType(parts[0][0])
	item.Description = parts[0][1:]

	if len(parts) > 1 {
		item.Selector = parts[1]
	}

	if len(parts) > 2 && parts[2] != "" {
		item.Host = parts[2]
	} else {
		item.Host = "null.host"
	}

	if len(parts) > 3 && parts[3] != "" {
		port, err := strconv.Atoi(parts[3])
		if err != nil {
			return nil, err
		}
		item.Port = port
	} else {
		item.Port = 70
	}

	return &item, nil
}
