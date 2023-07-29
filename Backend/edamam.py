import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()

app_id = os.getenv("APP_ID")
app_key = os.getenv("APP_KEY")

ingredient = "rice"

api_url = f"https://api.edamam.com/search?q={ingredient}&app_id={app_id}&app_key={app_key}"

response = requests.get(api_url)

data = response.json()

for hit in data["hits"]:
    print(hit["recipe"]["label"])
