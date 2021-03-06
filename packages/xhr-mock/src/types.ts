import {MockHeaders} from './MockHeaders';
import MockRequest from './MockRequest';
import MockResponse from './MockResponse';

export type MockHeaders = {
  [name: string]: string;
};

export type MockObject = {
  status?: number;
  reason?: string;
  headers?: MockHeaders;
  body?: any;
};

export type MockFunction = any;

export type Mock = MockObject | MockFunction;

export interface ErrorCallbackEvent {
  req: MockRequest;
  err: Error;
}
