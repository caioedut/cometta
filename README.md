<div align="center">
  <h1 style="color: #FF4500;">
    <br>
    <span style="color: #FF8C00;">☄</span> Cometta
    <br>
  </h1>

  <p>
    <br>
    The easiest way to style with CSS or JSS.
    <br>
  </p>

  <a href="https://www.npmjs.com/package/cometta">
   <img src="https://img.shields.io/npm/v/cometta.svg" alt="NPM" />
  </a>
</div>

<br>
<br>

<div align="center">

  [Usage](#usage)
  | [Normalize CSS](#normalize-css)
  | [Variables](#variables)
  | [Parsers](#parsers)
  | [Units](#units)
  | [Polyfill](#polyfill)
  | [Media Query](#media-query-media)

</div>

<br>
<br>

## Example

```js
import { create } from 'cometta';

const styles = create({
   container: {
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     height: '100vh',
     width: '100vw',
   },
});

```

`sheet(...)` generates styles and inserts a `<style>` tag into the DOM, returning a `className`.

`jss(...)` generates JSS styles and returns an `object`.

`css(...)` generates inline styles and returns a `string`.

### Vanilla
```jsx
document.body.innerHTML = `<main class="${sheet(styles.container)}"></main>`
```

### React

```jsx
<main className={sheet(styles.container)}></main>
```

### React Native

```jsx
<View style={jss(styles.container)}></View>
```

### Vue

```vue
<main :class="sheet(styles.container)"></main>
```

## Normalize CSS

```js
import { normalize } from 'cometta';

normalize();
```

## Variables

Used to create CSS-like variables.

```js
import { create, variables } from 'cometta';

variables({
   primary: '#9EA1D4'
});

const styles = create({
   container: {
     backgroundColor: 'var(--primary)'
   },
});
```

## Parsers

Used to create customized parsers.

```js
import { create, parser } from 'cometta';

parser('bg', (value) => {
    if (value) {
        return { backgroundColor: value }
    }
});

const styles = create({
   container: {
     bg: 'green'
   },
});
```

## Units

Used to define a custom unit resolver.

```js
import { create, unit } from 'cometta';

unit('gap', (value) => {
    return value * 16;
});

const styles = create({
   container: {
     padding: '1gap'
   },
});
```


## Polyfill

Used to define fallback values when the environment is not standardized.

Example for React Native:

```js
import { create, jss, polyfill } from 'cometta';
import { Dimensions, View } from 'react-native';

polyfill({
  fontSize: 16,
  screenWidth: () => Dimensions.get('window').width,
  screenHeight: () => Dimensions.get('window').height,
});

const styles = create({
   container: {
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     height: '100vh',
     width: '100vw',
   },
});

function App() {
  return (
    <View style={jss(styles.container)}>
      {/* ... */}
    </View>
  );
}

```

## Media Query (`@media`)

Works automatically with `sheet()`, and with `jss()` when using a polyfill.

```js
import { create } from 'cometta';

const styles = create({
   container: {
     backgroundColor: 'red',
     '@media (min-width: 769px)': {
       backgroundColor: 'green',
     }
   },
});
```
