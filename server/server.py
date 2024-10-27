from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable CORS for WebSocket



if __name__ == '__main__':
    socketio.run(app, port=5000)
