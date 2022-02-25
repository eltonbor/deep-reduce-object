# deep-reduce-object
Performs a deep reduce on complex nested objects and arrays

## Install
```sh
npm i deep-reduce-object
```

```js
const deepReduce = require('deep-reduce-object')

// Complex nested objects
const complexNestedObject = {
    transactions: [
        { 
            id: 1,
            amounts: [
                { value: 10 },
                { value: 20 },
            ]
        },
        { 
            id: 2,
            // amounts: undefined
        },
        { 
            id: 3,
            amounts: [
                { value: 30 },
                { value: 40 },
            ]
        }
    ]
}

// Get the sum of all values
const initialValue = 0
const reducer = (a, b) => a + b)
const path = 'transactions.amounts.value'
const sum = deepReduce(complexNestedObject, reducer, initialValue, path)
// sum = 100
```


## API
`deepReduce` takes 5 arguments. 4 mandatory and 1 optional:

```ts
deepReduce (
    collection: object|array,
    reducer: (accumulator: any, currentValue: any) => any,
    initialValue: any
    path: string,
    context: any
): any
```

### Arguments
- `collection` Object or Array to traverse.
- `reducer` Function to call with every value in `obj`-tree. See section below
  for [`reducer` function signature](#arguments-for-reducer-function).
- `initialValue` Initial value of `reduced` passed to `reducer`.
- `path` Path to the inner property of collection to be reduced.
- `context` (optional) Bound to reducer as `this`.

### Arguments for reducer function
The reducer function is called with these arguments:

```ts
(accumulator: any, value: any) => any
```

- `accumulator` The accumulated value returned by the reducer
- `value` Value of current path.


## Development
```sh
git clone https://github.com/eltonbor/deep-reduce-object.git
cd deep-reduce-object
npm install
npm test  # runs node index.test.js
```

## Inspired on
https://github.com/kmalakoff/reduce-deep


## License
MIT © 2022 Elton Tasca Borssoi