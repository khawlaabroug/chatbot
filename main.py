from flask import Flask, render_template, request
import asyncio
from asyncio import WindowsSelectorEventLoopPolicy
from g4f.client import Client

asyncio.set_event_loop_policy(WindowsSelectorEventLoopPolicy())

app = Flask(__name__)
client = Client()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    user_input = request.form['user_input']
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_input}],
    )
    return response.choices[0].message.content

if __name__ == '__main__':
    app.run(debug=True)
