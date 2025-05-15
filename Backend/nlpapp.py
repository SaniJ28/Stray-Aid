from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/nlp/output', methods=['POST'])
def receive_report():
    data = request.json
    print("📩 Received Report:\n", data["final_report"])
    return jsonify({"message": "Report received successfully!"})

if __name__ == '__main__':
    app.run(port=9001, debug=True)
