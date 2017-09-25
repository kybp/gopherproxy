package main

import "testing"

func checkItemType(actual ItemType, expected ItemType, t *testing.T) {
	if actual != expected {
		t.Errorf("Expected type %d (%s) to equal %d (%s).",
			actual, itemTypeNames[actual],
			expected, itemTypeNames[expected])
	}
}

func checkExpected(actual interface{}, expected interface{}, t *testing.T) {
	if actual != expected {
		t.Fatalf("Expected \"%v\" to equal \"%v\".", actual, expected)
	}
}

func checkEmpty(actual string, t *testing.T) {
	if actual != "" {
		t.Fatalf("Expected \"%s\" to be empty.", actual)
	}
}
