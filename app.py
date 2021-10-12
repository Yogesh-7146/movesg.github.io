from graph import load_graph, shortest_path
from flask import Flask, request, render_template, jsonify
import waitress
import os

stations = load_graph('static/stn.json')
app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/trainInfo/')
def trainInfo():
	return render_template('trainInfo.html')

@app.route('/map/')
def map():
	return render_template('map.html')

@app.route('/about/')
def about():
	return render_template('about.html')

# @app.route('/suggestions/')
# def about():
# 	return render_template('suggestions.html')

@app.route('/api/v1/')
def api():
	req = request.args
	route = shortest_path(stations, req['start'], req['end'])
	if route is None:
		return jsonify({'route': 'null'}), 400
	else:
		return jsonify({'route': route}), 200

if __name__ == "__main__":
     app.debug = False
     port = int(os.environ.get('PORT', 33507))
     waitress.serve(app, port=port)
     app.run 