import requests
import json

url = 'http://127.0.0.1:5000/recipes'

data = {
    'ingredients': ['butter', 'garlic']
}

response = requests.post(url, json=data)

print(json.dumps(response.json(), indent=4))
