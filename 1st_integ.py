from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types

app = Flask(__name__)
CORS(app, origins=["http://localhost"], methods=["GET", "POST"])

genai.configure(api_key="AIzaSyBC6v2G7zKkmgdSQ8cwhu7UDu4y2-cnVsU")

model = genai.GenerativeModel('gemini-1.5-flash')

@app.route("/generate-story", methods=["POST"])
def generate_story():
    try:
        data = request.get_json()
        prompt = data.get("prompt", "")

        contents = [
            types.Content(
                role='user',
                parts=[types.Part.from_text(prompt)]
            )
        ]

        response = model.generate_content(contents=contents)
        text = response.candidates[0].content.parts[0].text

        return jsonify({"text": text})

    except Exception as e:
        print(f"Error generating story: {e}")
        return "Error generating story", 500

if __name__ == "__main__":
    app.run(port=3000, debug=True)

