from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Resource, Api
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app_id = os.getenv("APP_ID")
app_key = os.getenv("APP_KEY")

app = Flask(__name__)
api = Api(app)
CORS(app)

class Recipes(Resource):
    def post(self):
        ingredients = request.json.get('ingredients', [])

        if not isinstance(ingredients, list) or len(ingredients) == 0:
            return jsonify({'message': 'Invalid ingredients provided'}), 400

        result = {'recipes': []}

        for ingredient in ingredients:
            api_url = f"https://api.edamam.com/search?q={ingredient}&app_id={app_id}&app_key={app_key}"
            response = requests.get(api_url)
            data = response.json()

            for hit in data["hits"]:
                recipe_ingredients = hit["recipe"]["ingredientLines"]
                if all(ing.lower() in ' '.join(recipe_ingredients).lower() for ing in ingredients):
                    result['recipes'].append({
                        'label': hit["recipe"]["label"],
                        'ingredients': recipe_ingredients,
                        'url': hit["recipe"]["url"]
                    })

        return result

api.add_resource(Recipes, '/recipes')

if __name__ == '__main__':
    app.run(debug=True)
