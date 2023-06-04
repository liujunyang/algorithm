type _Test = never extends string
  ? 'linbudu' extends string
    ? string extends Object
      ? Object extends any
        ? any extends unknown
          ? unknown extends any
            ? 7
            : 6
          : 5
        : 4
      : 3
    : 2
  : 1

let t: _Test = 7

import type { createCatName } from './tstest'
const name = createCatName()

export type LiteralType<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends null
  ? 'null'
  : T extends undefined
  ? 'undefined'
  : never

  class Base {
    printWithLove() { }
  }
  
  class Derived extends Base {
    override print() {
      // ...
    }
  }