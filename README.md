CLS Binder
==========

Used in conjunction with continuation-local-storage (CLS). CLS Binder ensures all created CLS namespaces are preserved (bound) across problematic callbacks

Installation
============
```
npm install cls-binder
```

Example
=======

```
var clsBinder = require('cls-binder');
problematicCB = clsBinder.bind( problematicCB );
```