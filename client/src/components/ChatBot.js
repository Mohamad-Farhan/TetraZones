import React, { Component } from 'react';
class KomunicateChat extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        (function (d, m) {
            let kommunicateSettings =
                { "appId": "4285c01425299e57295c187f53ae9ae1", "popupWidget": true, "automaticChatOpenOnNavigation": true };
            let script = document.createElement("script"); script.type = "text/javascript"; script.async = true;
            script.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            let head = document.getElementsByTagName("head")[0]; head.appendChild(script);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }
    render() {
        return (
            <div></div>
        )
    }
}

export default KomunicateChat;