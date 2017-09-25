package main

import (
	"encoding/json"
	"fmt"
	"testing"
)

func unexpectedParseError(err error, t *testing.T) {
	t.Fatalf("Unexpected error while parsing item: %s", err)
}

func TestParseEmptyStringReturnsError(t *testing.T) {
	if _, err := parseItem(""); err == nil {
		t.FailNow()
	}
}

func TestParseTEXT_FILEItemType(t *testing.T) {
	item, err := parseItem("0")
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkItemType(item.Type, TEXT_FILE, t)
	}
}

func TestParseDIRECTORYItemType(t *testing.T) {
	item, err := parseItem("1")
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkItemType(item.Type, DIRECTORY, t)
	}
}

func TestParseINFOItemType(t *testing.T) {
	item, err := parseItem("i")
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkItemType(item.Type, INFO, t)
	}
}

func TestParseDescriptionDefaultsToEmptyString(t *testing.T) {
	item, err := parseItem("0")
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkEmpty(item.Description, t)
	}
}

func TestParseDescriptionAfterItemType(t *testing.T) {
	description := "Some description text"
	item, err := parseItem("0" + description)
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkExpected(item.Description, description, t)
	}
}

func TestParseDescriptionUpToTab(t *testing.T) {
	description := "Some description text"
	item, err := parseItem(fmt.Sprintf("0%s\tmore text", description))
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkExpected(item.Description, description, t)
	}
}

func TestParseSelectorDefaultsToEmptyString(t *testing.T) {
	item, err := parseItem("0")
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkEmpty(item.Selector, t)
	}
}

func TestParseSelectorAfterDescription(t *testing.T) {
	selector := "a selector"
	item, err := parseItem(fmt.Sprintf("0a description\t%s", selector))
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkExpected(item.Selector, selector, t)
	}
}

func TestParseSelectorUpToTab(t *testing.T) {
	selector := "a selector"
	item, err := parseItem(fmt.Sprintf("0a description\t%s\tblah", selector))
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkExpected(item.Selector, selector, t)
	}
}

func TestParseHostDefaultsToNullHost(t *testing.T) {
	host := "null.host"
	item, err := parseItem("0a description\ta selector\t")
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkExpected(item.Host, host, t)
	}
}

func TestParseHostAfterSelector(t *testing.T) {
	host := "a host"
	item, err := parseItem(fmt.Sprintf("0a description\ta selector\t%s", host))
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkExpected(item.Host, host, t)
	}
}

func TestParseHostUpToTab(t *testing.T) {
	host := "a host"
	item, err := parseItem(
		fmt.Sprintf("0a description\ta selector\t%s\t1", host))
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkExpected(item.Host, host, t)
	}
}

func TestParsePortDefaultsTo70(t *testing.T) {
	port := 70
	item, err := parseItem("0a description\ta selector\ta host\t")
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkExpected(item.Port, port, t)
	}
}

func TestParsePortAfterHost(t *testing.T) {
	port := 50
	item, err := parseItem(
		fmt.Sprintf("0description\tselector\thost\t%d", port))
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkExpected(item.Port, port, t)
	}
}

func TestParsePortUpToTab(t *testing.T) {
	port := 50
	item, err := parseItem(
		fmt.Sprintf("0description\tselector\thost\t%d\tblah", port))
	if err != nil {
		unexpectedParseError(err, t)
	} else {
		checkExpected(item.Port, port, t)
	}
}

func TestMarshalJSONPreservesType(t *testing.T) {
	item := Item{Type: INFO}

	marshalled, err := json.Marshal(&item)
	if err != nil {
		t.Fatal("Unexpected error when marshalling item:", err)
	}

	result := Item{}
	err = json.Unmarshal(marshalled, &result)
	if err != nil {
		t.Fatal("Unexpected error when unmarshalling item:", err)
	}

	checkItemType(result.Type, item.Type, t)
}
