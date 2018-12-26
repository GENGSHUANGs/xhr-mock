import {MockFunction, MockObject} from '../types';
import {createResponseFromObject} from '../createResponseFromObject';

export function once(mock: MockFunction | MockObject): MockFunction {
  let callCount = 0;
  return (req: any, res: any) => {
    if (callCount === 0) {
      ++callCount;
      return typeof mock === 'function'
        ? mock(req, res)
        : createResponseFromObject(mock);
    } else {
      return undefined;
    }
  };
}
