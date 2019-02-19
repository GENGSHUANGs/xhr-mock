import {MockFunction} from './types';
import MockRequest from './MockRequest';
import MockResponse from './MockResponse';
import {MockError} from './MockError';
import {isPromiseLike} from './isPromiseLike';

const NO_RESPONSE_ERROR = new MockError(
  'No handler returned a response for the request.'
);

function sendByRXhr(mXhr) {
  const RealXMLHttpRequest = (window as any)['RealXMLHttpRequest'];
  const rxhr = new RealXMLHttpRequest();
  const {
    onabort,
    onerror,
    onload,
    onloadend,
    onloadstart,
    onprogress,
    onreadystatechange,
    ontimeout,
    responseType,
    timeout,
    withCredentials
  } = mXhr;
  Object.assign(rxhr, {
    onabort,
    onerror,
    onload,
    onloadend,
    onloadstart,
    onprogress,
    onreadystatechange,
    ontimeout,
    responseType,
    timeout,
    withCredentials
  });
  const headers = mXhr.req.headers();
  Object.keys(headers || {}).forEach(header => {
    rxhr.setRequestHeader(header, headers[header]);
  });
  return rxhr.open(method, url, async, username, password);
}

export function sync(
  router: any,
  mXhr: MockXMLHttpRequest,
  request: MockRequest,
  response: MockResponse
): MockResponse {
  var result = router.resolve({
    pathname: request.url().path,
    request,
    response
  });

  if (!result) {
    result = sendByRXhr(mXhr);
  }

  if (result) {
    if (isPromiseLike(result)) {
      throw new MockError(
        'A handler returned a Promise<MockResponse> for a synchronous request.'
      );
    }
    return result;
  }

  throw NO_RESPONSE_ERROR;
}

export function async(
  router: any,
  mXhr: MockXMLHttpRequest,
  request: MockRequest,
  response: MockResponse
): Promise<MockResponse> {
  var result = router.resolve({
    pathname: request.url().path,
    request,
    response
  });

  if (!result) {
    result = sendByRXhr(mXhr);
  }

  if (result) {
    if (isPromiseLike(result)) {
      throw new MockError(
        'A handler returned a Promise<MockResponse> for a synchronous request.'
      );
    }
    return result;
  }

  throw NO_RESPONSE_ERROR;
}
