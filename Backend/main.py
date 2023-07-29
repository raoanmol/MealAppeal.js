from flask import Flask, request
from flask_restful import Resource, Api
import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()

app_id = os.getenv("APP_ID")
app_key = os.getenv("APP_KEY")

app = Flask(__name__)
api = Api(app)

class Recipes(Resource):
    def post(self):
        ingredients = request.json['ingredients']

        result = {'recipes': []}

        for ingredient in ingredients:
            api_url = f"https://api.edamam.com/search?q={ingredient}&app_id={app_id}&app_key={app_key}"
            response = requests.get(api_url)
            data = response.json()

            # Only foods with provided ingredients
            for hit in data["hits"]:
                recipe_ingredients = hit["recipe"]["ingredientLines"]
                if all(any(ing.lower() in recipe.lower() for ing in ingredients) for recipe in recipe_ingredients):
                    result['recipes'].append({
                        'label': hit["recipe"]["label"],
                        'ingredients': recipe_ingredients,
                        'url': hit["recipe"]["url"]
                    })

        return result
    
api.add_resource(Recipes, '/recipes')

if __name__ == '__main__':
    app.run(debug=True)


# DOCS
# Make a post request to /recipes with a JSON containing ingredients
# This calls the post function in the Recipes class 
# This will send a request to the Edamam API with each ingredient
# This is then filtered to only include dishes that use JUST the provided ingredients
# After that, the label, the ingredients and the recipe URL is returned
#
# Example (you will need to import json and requests if you are doing in seperate file):
# response = requests.post('http://127.0.0.1:5000/recipes', { 'ingredients': ['rice', 'milk', 'sugar'] })
