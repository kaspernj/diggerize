# diggerize

Small utility library for safely digging values out of objects and requiring keys with helpful errors.

## Installation

```sh
npm install diggerize
```

## Usage

### Import the functions

```js
import {dig, digg, digs} from "diggerize"
```

Quick summary:

- `dig(...)` returns `undefined` when the path does not exist.
- `digg(...)` throws when the path does not exist.
- `digs(...)` throws when any requested top-level key does not exist.

### dig

Traverses through objects to find the given path. Missing paths return `undefined`.

```js
const myObject = {
  people: [
    {
      firstName: "Kasper",
      lastName: "Stöckel"
    }
  ]
}

dig(myObject, "people", 0, "firstName") //=> "Kasper"
dig(myObject, "people", 1, "firstName") //=> undefined
```


### digg

This works like `dig`, but it throws an error if one of the keys is not found.

```js
const myObject = {
  people: [
    {
      firstName: "Kasper",
      lastName: "Nielsen"
    }
  ]
}

digg(myObject, "people", 0, "firstName") //=> "Kasper"
digg(myObject, "people", 1, "firstName") //=> Throws an error because 1 isn't found in the people array
```

### digs

This throws if `object` does not contain the requested top-level keys.

```js
const {firstKey, secondKey} = digs(object, "firstKey", "secondKey")
```
