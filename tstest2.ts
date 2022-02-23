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
