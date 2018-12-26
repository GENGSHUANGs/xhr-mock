import MockEvent from './MockEvent';
import MockProgressEvent from './MockProgressEvent';
import MockEventTarget from './MockEventTarget';

// @ts-ignore: https://github.com/jameslnewell/xhr-mock/issues/45
export default class MockXMLHttpRequestEventTarget extends MockEventTarget
  implements XMLHttpRequestEventTarget {
  rxhr: any;
  _onabort: any;
  _onerror: any;
  _onload: any;
  _onloadend: any;
  _onloadstart: any;
  _onprogress: any;
  _ontimeout: any;

  get onabort() {
    if (this.rxhr) {
      return this.rxhr.onabort;
    }
    return this._onabort;
  }
  set onabort(onabort: any) {
    if (this.rxhr) {
      this.rxhr.onabort = onabort;
    }
    this._onabort = onabort;
  }

  get onerror() {
    if (this.rxhr) {
      return this.rxhr.onerror;
    }
    return this._onerror;
  }
  set onerror(onerror: any) {
    if (this.rxhr) {
      this.rxhr.onerror = onerror;
    }
    this._onerror = onerror;
  }

  get onload() {
    if (this.rxhr) {
      return this.rxhr.onload;
    }
    return this._onload;
  }
  set onload(onload: any) {
    if (this.rxhr) {
      this.rxhr.onload = onload;
    }
    this._onload = onload;
  }

  get onloadend() {
    if (this.rxhr) {
      return this.rxhr.onloadend;
    }
    return this._onloadend;
  }
  set onloadend(onloadend: any) {
    if (this.rxhr) {
      this.rxhr.onloadend = onloadend;
    }
    this._onloadend = onloadend;
  }

  get onloadstart() {
    if (this.rxhr) {
      return this.rxhr.onloadstart;
    }
    return this._onloadstart;
  }
  set onloadstart(onloadstart: any) {
    if (this.rxhr) {
      this.rxhr.onloadstart = onloadstart;
    }
    this._onloadstart = onloadstart;
  }

  get onprogress() {
    if (this.rxhr) {
      return this.rxhr.onprogress;
    }
    return this._onprogress;
  }
  set onprogress(onprogress: any) {
    if (this.rxhr) {
      this.rxhr.onprogress = onprogress;
    }
    this._onprogress = onprogress;
  }

  get ontimeout() {
    if (this.rxhr) {
      return this.rxhr.ontimeout;
    }
    return this._ontimeout;
  }
  set ontimeout(ontimeout: any) {
    if (this.rxhr) {
      this.rxhr.ontimeout = ontimeout;
    }
    this._ontimeout = ontimeout;
  }
}
