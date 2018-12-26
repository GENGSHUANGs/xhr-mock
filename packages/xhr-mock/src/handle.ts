import {MockFunction} from './types';
import MockRequest from './MockRequest';
import MockResponse from './MockResponse';
import {MockError} from './MockError';
import {isPromiseLike} from './isPromiseLike';

const NO_RESPONSE_ERROR = new MockError(
  'No handler returned a response for the request.'
);

export function sync(
  handlers: MockFunction[],
  request: MockRequest,
  response: MockResponse
): MockResponse {
  for (let i = 0; i < handlers.length; ++i) {
    const result = handlers[i](request, response);

    if (result) {
      if (isPromiseLike(result)) {
        throw new MockError(
          'A handler returned a Promise<MockResponse> for a synchronous request.'
        );
      }
      return result;
    }
  }

  throw NO_RESPONSE_ERROR;
}

function reduce(values: any[], fn: Function, initializeValue: any) {
  if (!values || values.length === 0) {
    return Promise.resolve(initializeValue);
  }
  return new Promise((resolve: Function, reject: Function) => {
    let total: any = initializeValue;
    function next(idx: number): any {
      try {
        if (idx >= values.length) {
          return resolve(total);
        }
        const val = values[idx];

        const _r: any = fn(total, val);
        if (_r && _r['then']) {
          _r
            .then((_total: any) => {
              total = _total;
              next(idx + 1);
            })
            .catch(reject);
        } else {
          total = _r;
          next(idx + 1);
        }
      } catch (err) {
        reject(err);
      }
    }

    next(0);
  });
}

export function async(
  handlers: MockFunction[],
  request: MockRequest,
  response: MockResponse
): Promise<MockResponse> {
  return reduce(
    handlers,
    (result: MockResponse, handler: MockFunction) => {
      if (!result) {
        return new Promise((resolve: Function, reject: Function) => {
          try {
            const result: any | MockResponse = handler(
              request,
              response,
              (err: Error, result: MockResponse) => {
                if (err) {
                  return reject(err);
                }
                resolve(result);
              }
            );
            if (result === false) {
              return resolve(undefined);
            }
            if (result) {
              if (result.then) {
                return result.then(resolve).catch(reject);
              }
              resolve(result);
            }
          } catch (err) {
            reject(err);
          }
        });
      }
      return result;
    },
    undefined
  ).then((result: MockResponse) => {
    if (!result) {
      throw NO_RESPONSE_ERROR;
    }
    return result;
  });
}
