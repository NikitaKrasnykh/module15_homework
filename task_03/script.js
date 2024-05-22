const URL = 'wss://echo-ws-service.herokuapp.com';
let websocket = new WebSocket(URL);

const input = document.querySelector('.input');
const connectButton = document.querySelector('.connect-button');
const disconnectButton = document.querySelector('.disconnect-button');
const sendButton = document.querySelector('.send-button');
const geoButton = document.querySelector('.geo-button');
const chatDisplay = document.querySelector('.chat-display');
const statusDisplay = document.querySelector('.connection-status');

let connected = false;

const geoLocationError = () => {
    displayServerMessage("Can`t get your geolocation");
};

const geoLocationSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let element = document.createElement('a');
    element.textContent = 'Your location';
    element.href = `https://www.openstreetmap.org/#map=16/${latitude}/${longitude}`;
    element.target = '_blank';
    element.classList.add('message-client', 'geo-link');
    chatDisplay.appendChild(element);
};

function displayClientMessage(message) {
    let element = document.createElement('p');
    element.classList.add('message-client');
    element.innerHTML = message;
    chatDisplay.appendChild(element);
    chatDisplay.scrollTo(0, chatDisplay.scrollHeight)
};

function displayServerMessage(message) {
    let element = document.createElement('p');
    element.classList.add('message-server');
    element.innerHTML = message;
    chatDisplay.appendChild(element);
    chatDisplay.scrollTo(0, chatDisplay.scrollHeight)
};

connectButton.addEventListener('click', () => {
    websocket = new WebSocket(URL);

    websocket.onopen = function(evt) {
        statusDisplay.textContent = 'CONNECTED';
        connected = true;
    };

    websocket.onclose = function(evt) {
        statusDisplay.textContent = 'DISCONNECTED';
        connected = false;
    };

    websocket.onmessage = function(evt) {
        displayServerMessage(evt.data);
    };

    websocket.onerror = function(evt) {
        displayServerMessage(evt.data);
    }
});

disconnectButton.addEventListener('click', () => {
    websocket.close();
    websocket = null;
    connected = false;
});

sendButton.addEventListener('click', () => {
    let message = input.value;
    if(message.trim() === ''){
        return
    };

    if (connected) {
        displayClientMessage(message);
        websocket.send(message);
        input.value = "";
    } else {
        displayClientMessage('Please connect to the server');
        input.value = "";
    };
});

geoButton.addEventListener('click', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError);
    } else {
        displayClientMessage('Your client does not support geolocation')
    }
});
