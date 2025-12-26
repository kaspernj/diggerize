# diggerize

## Usage

### Import the functions

```js
import {dig, digg, digs} from "diggerize"
```

### dig

Traverses through objects to find the given path.

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
dig(myObject, "people", 1, "firstName") //=> null
```


### digg

This functions like `dig` but it will throw an error if one of the keys isn't found.

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

This will fail is `object` doesn't contain keys named `firstKey` and `secondKey`.
```js
const {firstKey, secondKey} = digs(object, "firstKey", "secondKey")
```
