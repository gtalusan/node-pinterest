node-pinterest

Simple request-promise based class for hooking into Pinterest.

```
var PDK = require('node-pinterest');
var pinterest = PDK.init(<YOUR ACCESS TOKEN>);
pinterest.api('me').then(console.log);
```
