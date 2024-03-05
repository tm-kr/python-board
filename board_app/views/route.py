from board_app import app
from flask import render_template

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/detail')
def detail():
    return render_template('detail.html')
