package main

import "net/http"

func main() {
	fs := http.FileServer(http.Dir("data/"))
	http.Handle("/data/", http.StripPrefix("/data/", fs))
}
