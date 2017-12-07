import random
from flask import Flask, render_template, abort, request
import json

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')

@app.route('/')
def index():
    return render_template('index.html', data = definitions)


@app.route('api/definitions/new', methods=['POST'])
def new_definition():
    definition = request.form['definition']
    columns = request.form['columns'].split(',')
    #Post to mongodb



if __name__ == '__main__':
    app.run()
