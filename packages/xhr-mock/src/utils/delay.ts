import {MockFunction, MockObject} from '../types';
import MockResponse from '../MockResponse';
import {createResponseFromObject} from '../createResponseFromObject';

export function delay(
  mock: MockFunction | MockObject,
  ms: number = 1500
): MockFunction {
  return (req: any, res: any) => {
    const ret =
      typeof mock === 'function'
        ? mock(req, res)
        : createResponseFromObject(mock);
    if (ret === undefined) {
      return undefined;
    }
    return Promise.resolve(ret).then((val: any) => {
      if (val == undefined) {
        return undefined;
      } else {
        return new Promise<MockResponse | undefined>(resolve =>
          setTimeout(() => resolve(val), ms)
        );
      }
    });
  };
}
