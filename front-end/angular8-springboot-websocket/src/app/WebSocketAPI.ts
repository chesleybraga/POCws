import * as Stomp from 'stompjs';
import { AppComponent } from './app.component';

export class WebSocketAPI {

    webSocketEndPoint = `ws://${this.getUrl()}:7210/ws`;
    topic = '/topic/onustatus';
    stompClient: any;
    appComponent: AppComponent;
    
    constructor(appComponent: AppComponent){
        this.appComponent = appComponent;
    }

    _connect() {
        console.log("Initialize WebSocket Connection: " + this.webSocketEndPoint);
        const websocket = new WebSocket(this.webSocketEndPoint);
        this.stompClient = Stomp.over(websocket);
        this.stompClient.debug = true;
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);

                return sdkEvent;
            });
        }, this.errorCallBack);
    };

    public subscribe() {
        debugger;
        this.stompClient.subscribe(this.topic, function (sdkEvent) {
            this.onMessageReceived(sdkEvent);
        });
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this.stompClient.connect();
        }, 5000);
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message) {
        console.log("sending message via web socket: " + message);
        debugger;
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    private getUrl(): any {
        const url = (window.location.host).split(':');
        return url[0];
    }

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message);
        this.appComponent.handleMessage(JSON.stringify(message.body));
    }
}