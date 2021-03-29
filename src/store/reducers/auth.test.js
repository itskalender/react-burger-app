import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it("should return initial state if reducer's arguments are invalid", () => {
    expect(reducer(undefined, {})).toEqual({
      idToken: null,
      localId: null,
      loading: false,
      error: null,
      directedPath: '/',
    });
  });

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          idToken: null,
          localId: null,
          loading: false,
          error: null,
          directedPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCEEDED,
          idToken: 'some-id-token',
          localId: 'some-local-id',
        }
      )
    ).toEqual({
      idToken: 'some-id-token',
      localId: 'some-local-id',
      loading: false,
      error: null,
      directedPath: '/',
    });
  });
});
