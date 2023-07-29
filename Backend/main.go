package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/joho/godotenv"
)

type Response struct {
	Hits []struct {
		Recipe struct {
			Label string `json:"label"`
		} `json:"recipe"`
	} `json:"hits"`
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	appID := os.Getenv("APP_ID")
	appKey := os.Getenv("APP_KEY")
	ingredient := "rice"

	apiURL := fmt.Sprintf(
		"https://api.edamam.com/search?q=%s&app_id=%s&app_key=%s",
		url.QueryEscape(ingredient),
		url.QueryEscape(appID),
		url.QueryEscape(appKey),
	)

	resp, err := http.Get(apiURL)
	if err != nil {
		log.Fatalf("Error sending request to Edamam API: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
	}

	var response Response
	err = json.Unmarshal(body, &response)
	if err != nil {
		log.Fatalf("Error parsing response body: %v", err)
	}

	for _, hit := range response.Hits {
		fmt.Println(hit.Recipe.Label)
	}
}
