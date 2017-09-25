package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetRootWithoutHostReturns400BadRequest(t *testing.T) {
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatalf("Unexpected error while requesting /: %s\n", err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handler)
	handler.ServeHTTP(rr, req)

	checkExpected(rr.Code, http.StatusBadRequest, t)
}

func TestGetRootReturnsApplicationJSON(t *testing.T) {
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatalf("Unexpected error while requesting /: %s\n", err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handler)
	handler.ServeHTTP(rr, req)

	checkExpected(rr.HeaderMap.Get("Content-Type"), "application/json", t)
}
