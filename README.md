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
