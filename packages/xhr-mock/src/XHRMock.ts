import window = require('global');
import {Mock, MockFunction, ErrorCallbackEvent} from './types';
import createMockFunction from './createMockFunction';
import MockXMLHttpRequest from './MockXMLHttpRequest';

const RealXMLHttpRequest = ((window as any)['RealXMLHttpRequest'] =
  window.XMLHttpRequest);

export class XHRMock {
  RealXMLHttpRequest: {new (): XMLHttpRequest} = RealXMLHttpRequest;

  setup(): XHRMock {
    // @ts-ignore: https://github.com/jameslnewell/xhr-mock/issues/45
    window.XMLHttpRequest = MockXMLHttpRequest;
    this.reset();
    return this;
  }

  teardown(): XHRMock {
    this.reset();
    window.XMLHttpRequest = RealXMLHttpRequest;
    return this;
  }

  reset(): XHRMock {
    delete MockXMLHttpRequest.router;
    return this;
  }

  error(callback: (event: ErrorCallbackEvent) => void): XHRMock {
    MockXMLHttpRequest.errorCallback = callback;
    return this;
  }

  routes(): any;
  routes(routes: any): XHRMock;
  routes(routes?: any): any | XHRMock {
    // TODO
  }

  router(): any;
  router(router: any): XHRMock;
  router(router?: any): any | XHRMock {
    if (typeof router !== 'undefined' && router !== null) {
      MockXMLHttpRequest.router = router;
      return this;
    } else {
      return MockXMLHttpRequest.router;
    }
  }
}

// I'm only using a class so I can make use make use of TS' method overrides
export default new XHRMock();
