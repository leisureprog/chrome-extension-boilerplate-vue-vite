export default {
    send: (message) => JSON.stringify(message),
    receive: (serializedMessage) => JSON.parse(serializedMessage),
};
