import random
from flask import Flask, render_template, abort, request, jsonify
import json
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')

#Testing connection with MongoDB
try:
    conn=pymongo.MongoClient()
    print "Connected successfully!!!"
except pymongo.errors.ConnectionFailure, e:
   print "Could not connect to MongoDB: %s" % e
# Establishing connection with Mlab
client = MongoClient('mongodb://test:test@ds159662.mlab.com:59662/medslack')
# Database name: medslack
db = client['medslack']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/all_defs', methods=['GET'])
def all_defs():
    definitions = db.definitions.find()
    results = {}
    for i, j in enumerate(definitions):
        results[i] = {'id': str(j['_id']), 'definition' : j['definition'], 'columns': j['columns']}
    if definitions:
        return jsonify(results)
    else:
        return 'No definitions found'

@app.route('/api/definitions/<definition_id>', methods=['GET'])
def find_definition(definition_id):
    definition = db.definitions.find_one({"_id" : ObjectId(definition_id)})
    result = {'definition': definition['definition'], 'columns' : definition['columns'] }
    if (definition['tables']):
        result['tables'] = definition['tables']
    return jsonify(result)

@app.route('/api/definitions/new', methods=['GET','POST'])
def new_definition():
    if request.method == 'POST':
        input_data = request.get_json()
        definition = input_data['definition']
        columns =  input_data['columns']
        db.definitions.insert({"definition" : definition, "columns": columns, "tables" : []})
        return "success"
    return json.dumps({'status':'OK'});

@app.route('/api/definitions/<definition_id>/delete', methods=['GET', 'DELETE'])
def delete_definition(definition_id):
    if request.method == 'DELETE':
        definition = db.definitions.remove({"_id" : ObjectId(definition_id)})
        return "success"
    return json.dumps({'status':'OK'});

@app.route('/api/definitions/<definition_id>/edit', methods=['GET', 'PUT'])
def update_definition(definition_id):
    if request.method == 'PUT':
        input_data = request.get_json()
        definition = db.definitions.find_one_and_update({"_id" : ObjectId(definition_id)}, {'$set': input_data})
        return "success"
    return json.dumps({'status':'OK'});

@app.route('/api/definitions/<definition_id>/tables/new', methods=['GET','POST'])
def new_table(definition_id):
    if request.method == 'POST':
        input_data = request.get_json()
        table_header = input_data['table_header']
        num_rows =  input_data['num_rows']
        definition = db.definitions.find_one({"_id" : ObjectId(definition_id)})
        definition['tables'].append({"table_header": table_header, "num_rows": num_rows})
        try:
            db.definitions.save(definition)
            print("Database updated")
        except:
            print("Failed to update database")

        return "success"
    return json.dumps({'status':'OK'});



if __name__ == '__main__':
    app.run()
