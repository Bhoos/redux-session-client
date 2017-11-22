export default function serializer(dispatch) {
  let lastSerialId = null;

  // return the dispatcher method as required by redux-session-server
  const dispatcher = (action, serialId) => {
    // If no serial id has been provided, then just pass through
    if (!serialId) {
      return dispatch(action);
    }

    if (lastSerialId !== null) {
      const d = serialId - lastSerialId;
      const count = Array.isArray(action.payload) ? action.payload.length : 1;

      if (d !== count) {
        throw new Error(`Action serialization error. Expected ${d} actions but got ${count} actions`);
      }
    }

    lastSerialId = serialId;
    return dispatch(action);
  };

  // expose the last last serial id
  dispatcher.getId = () => lastSerialId;

  return dispatcher;
}
