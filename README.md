# redux-session-client
A session connector react bindings for redux-session-server

# Installation
> `$ npm install redux-session-client`

# Usage
```javascript
import { Session, withSession } from 'redux-session-client';

// On your root view connect to a session
const Root = ({ connector }) => (
  <Session connector={connector}>
    <YourSessionComponent />
  </Session>
);

// Connect your component to session actions
const YourSessionComponent = withSession(['pick'])(({ session }) => (
  <Button onClick={session.pick} title="Pick" />
));
```
## Using serializer
```javascript
import { serializer } from 'redux-session-client';

// using socket to connect to remote server
const socketClient = (..., dispatch) => {
  const serialized = serializer(dispatch);
  const socket = new WebSocket('...');
  socket.on('message', (data) => {
    const [action, serialId] = JSON.parse(data);
    try {
      serialized(action, serialId);
    } catch (err) {
      // Out of sync error, reconnect with current serialId
      reconnect(serialized.getId());
    }
  });
};
```