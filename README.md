# chai-datetime

Will shallowly perform a deep equal assertion.

[![Build Status](https://travis-ci.org/michelsalib/chai-shallow-deep-equal.png?branch=master)](https://travis-ci.org/michelsalib/chai-shallow-deep-equal)

## Usage

### Browser

```html
<script src="chai.js"></script>
<script src="chai-shallow-deep-equal.js"></script>
```

### Node

```javascript
var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
```

## Assertions

ShallowDeepEqual is available for all chai assertion styles:

```javascript
var a = {name: 'Michel', language: 'javascript'};
var b = {name: 'Michel'};

a.should.shallowDeepEqual(b);
expect(a).to.shallowDeepEqual(b);
assert.shallowDeepEqual(a, b);
```
