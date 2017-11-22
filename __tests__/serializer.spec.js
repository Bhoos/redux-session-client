import { serializer } from '../src';

describe('Action Serializer', () => {
  const mockDispatch = jest.fn();
  const serializedDispatch = serializer(mockDispatch);

  it('must return a dispatch method with serialId', () => {
    expect(typeof serializedDispatch).toBe('function');
    expect(serializedDispatch.length).toBe(2);
  });

  it('must expose the last serial id starting with null', () => {
    expect(serializedDispatch.getId()).toBeNull();
  });

  it('must dispatch the function if invoked without serialId', () => {
    const action = { a: 1 };
    serializedDispatch(action);
    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls[0]).toEqual([action]);
    expect(serializedDispatch.getId()).toBeNull();
  });

  it('must allow any serialId value at the start', () => {
    const action = { a: 2 };
    serializedDispatch(action, 20);
    expect(mockDispatch.mock.calls).toHaveLength(2);
    expect(mockDispatch.mock.calls[1]).toEqual([action]);
    expect(serializedDispatch.getId()).toBe(20);
  });

  it('must allow only valid serial increments based on payload', () => {
    const action = { payload: {} };
    serializedDispatch(action, 21);
    expect(mockDispatch.mock.calls).toHaveLength(3);
    expect(mockDispatch.mock.calls[2]).toEqual([action]);
    expect(serializedDispatch.getId()).toBe(21);

    expect(() => serializedDispatch(action, 24)).toThrow(/serialization error/);
    serializedDispatch({ payload: [1, 2, 3, 4] }, 25);
    expect(mockDispatch.mock.calls).toHaveLength(4);
    expect(serializedDispatch.getId()).toBe(25);
  });
});
