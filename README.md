# codeshift-sort-constructor
jscodeshift mod to sort parameters alphabetically in constructors.

For example:

```js
class SomeStuff {
  /**
   * This does some stuff.
   * @ngInject
   * @param goo
   * @param zoo
   * @param foo
   */
  constructor(goo, zoo, foo) {}
}
```

Will be transformed into

```js
class SomeStuff {
  /**
   * This does some stuff.
   * @ngInject
   * @param foo
   * @param goo
   * @param zoo
   */
  constructor(foo, goo, zoo) {}
}
```

# How to use

1. Download [jscodeshit](https://github.com/facebook/jscodeshift)
1. Get this code

```shell
# Download jscodeshift
npm i -g jscodeshift

# Clone this repo
git clone https://github.com/andresdominguez/codeshift-sort-constructor.git

# Transform providing a path
jscodeshift -t codeshift-sort-constructor/sort-constructor.js path
```
