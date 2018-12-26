import {MockHeaders} from './MockHeaders';
import EventTarget from './MockEventTarget';
import MockProgressEvent from './MockProgressEvent';

export default class MockResponse {
  private _status: number = 200;
  private _reason: string = 'OK';
  private _headers: MockHeaders = {};
  private _body: any = null;

  status(): number;
  status(status: number): MockResponse;
  status(status?: number): number | MockResponse {
    if (typeof status !== 'undefined') {
      this._status = status;
      return this;
    } else {
      return this._status;
    }
  }

  reason(): string;
  reason(reason: string): MockResponse;
  reason(reason?: string): string | MockResponse {
    if (typeof reason !== 'undefined') {
      this._reason = reason;
      return this;
    } else {
      return this._reason;
    }
  }

  statusText(): null | string;
  statusText(reason: string): MockResponse;
  statusText(reason?: string): null | string | MockResponse {
    console.warn(
      'xhr-mock: MockResponse.statusText() has been deprecated. Use MockResponse.reason() instead.'
    );
    if (typeof reason !== 'undefined') {
      return this.reason(reason);
    } else {
      return this.reason();
    }
  }

  header(name: string): null | string;
  header(name: string, value: string): MockResponse;
  header(name: string, value?: string): null | string | MockResponse {
    if (typeof value !== 'undefined') {
      this._headers[name.toLowerCase()] = value;
      return this;
    } else {
      return this._headers[name.toLowerCase()] || null;
    }
  }

  headers(): MockHeaders;
  headers(headers: MockHeaders): MockResponse;
  headers(headers?: MockHeaders): MockHeaders | MockResponse {
    if (typeof headers === 'object') {
      for (let name in headers) {
        if (headers.hasOwnProperty(name)) {
          this.header(name, headers[name]);
        }
      }
      return this;
    } else {
      return this._headers;
    }
  }

  body(): any;
  body(body: any): MockResponse;
  body(body?: any): any | MockResponse {
    if (typeof body !== 'undefined') {
      this._body = body;
      return this;
    } else {
      return this._body;
    }
  }

  json(obj: any): MockResponse {
    this.header('Content-Type', 'application/json');
    this._body = JSON.stringify(obj);
    return this;
  }
}
