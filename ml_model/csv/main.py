from flask import Flask, jsonify
from ml_model.csv.create_csv import create_csv
from ml_model.csv.create_csv import remove_row
from ml_model.csv.create_csv import add_row
from ml_model.csv.create_csv import update_row
import random

app = Flask(__name__)

@app.route("/csv/create", methods=["GET"] )
def file_creation():
    create_csv()
    return "File created"

@app.route("/csv/add", methods=["POST"] )
def file_add():
    add_row([106, "Frank White", "ECE", "Blockchain Security", "AI Ethics", "IoT in Healthcare", "", "Smart Traffic System"])
    return "File updated"

@app.route("/csv/update", methods=["PUT"] )
def file_update():
    update_row(102, [102, "Bob Smith", "IT", "AI Chatbot", "Cloud Security", "Blockchain", "ML Project", "Network Monitoring, Data Science"])
    return "File updated"

@app.route("/csv/remove", methods=["DELETE"] )
def file_remove():
    remove_row(102)
    return "File updated"

if __name__ == "__main__":
    app.run(debug=True)
