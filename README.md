<div align="center">
  <h1 style="color: #FF4500;">
    <br>
    <span style="color: #FF8C00;">☄</span> Cometta
    <br>
  </h1>

  <p>
    <br>
    The easiest way to style using CSS or JSS.
    <br>
  </p>

  <a href="https://www.npmjs.com/package/cometta">
   <img src="https://img.shields.io/npm/v/cometta.svg" alt="NPM" />
  </a>
</div>

<br>
<br>

## Normalize CSS

```js
import cometta from 'cometta';

cometta.normalize();
```

## Example

```js
import cometta from 'cometta';

const styles = cometta.create({
   container: {
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     height: '100vh',
     width: '100vw',
   },
});

```

## Usage

Use `cometta.sheet(...)` to generate style tag on DOM and return `className`.

Use `cometta.jss(...)` to generate jss style and return `object`.

Use `cometta.css(...)` to generate inline style and return `string`.

### Vanilla
```jsx
document.body.innerHTML = `<main class="${cometta.sheet(styles.container)}"></main>`
```

### React

```jsx
<main className={cometta.sheet(styles.container)}></main>
```

### React Native

```jsx
<View style={cometta.jss(styles.container)}></View>
```

### Vue

```vue
<main :class="cometta.sheet(styles.container)"></main>
```

## Variables

Used to create css-like variables.

```js
import cometta from 'cometta';

cometta.variables({
   primary: '#9EA1D4'
});

const styles = cometta.create({
   container: {
     backgroundColor: 'var(primary)'
   },
});
```

## Parsers

You can customize parsers.

```js
import cometta from 'cometta';

cometta.parser('bg', (value) => {
    if (value) {
        return { backgroundColor: value }
    }
});

const styles = cometta.create({
   container: {
     bg: 'green'
   },
});
```

## Polyfill

Used to define some values when the environment is not standardized. Example for React Native:

```js
import cometta from 'cometta';
import { Dimensions, View } from 'react-native';

cometta.polyfill({
  fontSize: 16,
  screenWidth: () => Dimensions.get('window').width,
  screenHeight: () => Dimensions.get('window').height,
});

const styles = cometta.create({
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
    <View style={cometta.jss(styles.container)}>
      {/* ... */}
    </View>
  );
}

```

## Media Query (`@media`)

Works on `cometta.sheet()` with no configuration and on `cometta.jss()` using polyfill (dimensions).

```js
import cometta from 'cometta';

const styles = cometta.create({
   container: {
     backgroundColor: 'red',
     '@media (min-width: 769px)': {
       backgroundColor: 'green',
     }
   },
});
```
