package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetAPIRootWithoutHostReturns400BadRequest(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/", nil)
	if err != nil {
		t.Fatalf("Unexpected error while requesting /api/: %s\n", err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handler)
	handler.ServeHTTP(rr, req)

	checkExpected(rr.Code, http.StatusBadRequest, t)
}

func TestGetAPIRootReturnsApplicationJSON(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/", nil)
	if err != nil {
		t.Fatalf("Unexpected error while requesting /: %s\n", err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handler)
	handler.ServeHTTP(rr, req)

	checkExpected(rr.HeaderMap.Get("Content-Type"), "application/json", t)
}
