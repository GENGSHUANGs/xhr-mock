import {Mock, MockObject, MockFunction} from './types';
import {formatURL} from './MockURL';
import MockRequest from './MockRequest';
import MockResponse from './MockResponse';
import {createResponseFromObject} from './createResponseFromObject';

export default function(
  method: string,
  url: string | RegExp,
  mock: Mock
): MockFunction {
  const matches = (req: MockRequest) => {
    const requestMethod = req.method();
    const requestURL = req.url().toString();

    if (requestMethod.toUpperCase() !== method.toUpperCase()) {
      return false;
    }

    if (url instanceof RegExp) {
      url.lastIndex = 0; //reset state of global regexp
      return url.test(requestURL);
    }

    return requestURL === url; //TODO: should we use .startsWith()???
  };

  const fn = (req: any, res: any, callback: Function) => {
    if (matches(req)) {
      if (typeof mock === 'object') {
        return createResponseFromObject(mock);
      } else {
        return mock(req, res, callback);
      }
    }
    return false;
  };

  (fn as any)['match'] = (req: any) => {
    return matches(req);
  };

  return fn;
}
