### 失败支持

> 如果请求未匹配到规则，则，Xhr Mock 会尝试使用 `window.RealXMLHttpRequest` 对象发送真实请求
> `window.RealXMLHttpRequest` 值会在 `XhrMock.setup()` 的时候自动更改为 `window.XMLHttpRequest`

### 异步支持

```javascript
// 使用回调
Xhr.get('https://api.xxx.com/login', function(req, resp, callback) {
  client.incrby('player-login-times', 1, function(err, times) {
    if (err) {
      return callback(err);
    }
    callback(
      undefined,
      resp.json({
        success: true
      })
    );
  });
});

// 使用Promise
Xhr.get('https://api.xxx.com/login', function(req, resp) {
  return client.incrbyAsync('player-login-times', 1).then(function(times) {
    return Promise.resolve(
      resp.json({
        success: true
      })
    );
  });
});
```

# xhr-mock

This repo is a mono-repo managed by `lernajs`.

## [📖 Documentation](./packages/xhr-mock)

The documentation for the main NPM package can be found [here](./packages/xhr-mock).

## 🛠 Development

Install the dependencies:

```bash
yarn
yarn run bootstrap
```

### The NPM package

Build and test the package:

```bash
cd packages/xhr-mock
yarn run build # transpile the sources
yarn run test  # run the unit tests
```

### The integration tests

Test the package against a few well known XHR libraries:

```bash
# NOTE: you need to build the main package first
cd packages/xhr-mock-tests
yarn run test  # run the integration tests
```

## 🎁 Contributing

Contributors are very welcome! Please raise an issue or PR on Github.
