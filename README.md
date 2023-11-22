# props-with-global-types

This repo presents two ways of using global types for defining props in vue components and shows only one of them actually works.

To reproduce this issue:
```
npm i
npm run type-check
```

Expected result: we get typescript error in `App.vue` in place of using `CompUsingGlobalType1` as we are passing `number` instead of `string` to its prop `foo.bar`.

Actual result: there is no typescript error in above place.

### Context
This repo presents two ways of using global types for defining props in vue components (and shows only one of them actually works).
1. defining your type in a separate file and then exporting it from within the `declare global { ... }` block
```typescript
// /types/GlobalExternalType1.ts
export interface GlobalExternalType1 {
  bar: string
}

```
```typescript
// /types/index.ts
declare global {
  // @ts-ignore
  export type { GlobalExternalType1 } from './GlobalExternalType1'
}

export {}
```
2. defining your type inside `declare global { ... }` block
```typescript
// /types/index.ts
declare global {
  interface GlobalExternalType2 {
    bar: string
  }
}

export {}
```

It shows that types declared in both ways seem to be available globally in our project.
It seems that we can define props with both. **The problem is** - only solution 2 seems to **actually** work.

- Component `CompUsingGlobalType1.vue` defines props using global type defined with approach 1.
```typescript
defineProps<{ foo: GlobalExternalType1 }>()
```
- Component `CompUsingGlobalType2.vue` defines props using global type defined with approach 2.
```typescript
defineProps<{ foo: GlobalExternalType2 }>()
```
- `App.vue` uses both components and passes to them prop `foo` **with wrong type of bar property**, hence we expect to get typescript errors for both.

```vue
<template>
  <!-- we should get ts errors for all components -->
  <CompWithExplicitlyImportedType
    :foo="{ bar: 123 }"
  />
  <CompUsingGlobalType1 
    :foo="{ bar: 123 }"
  />
  <CompUsingGlobalType2
    :foo="{ bar: 123 }"
  />
</template>
```

It turns out however, that we only get ts error for the component defining props using types declared with approach 2 - `CompUsingGlobalType2.vue`.

## **For `CompUsingGlobalType1.vue` we are not getting any ts errors (even though we are passing `number` instead of `string` for the `bar` property).**

```
[12:21:55] ➜  props-with-global-types git:(main) npm run type-check

> props-with-global-types@0.0.0 type-check
> vue-tsc --noEmit -p tsconfig.app.json --composite false

src/App.vue:10:13 - error TS2322: Type 'number' is not assignable to type 'string'.

10     :foo="{ bar: 123 }"
               ~~~

  src/types/ExternalType.ts:2:3
    2   bar: string
        ~~~
    The expected type comes from property 'bar' which is declared here on type 'ExternalType'

src/App.vue:16:13 - error TS2322: Type 'number' is not assignable to type 'string'.

16     :foo="{ bar: 123 }"
               ~~~

  src/types/index.ts:9:5
    9     bar: string
          ~~~
    The expected type comes from property 'bar' which is declared here on type 'GlobalExternalType2'


Found 2 errors in the same file, starting at: src/App.vue:10
```
