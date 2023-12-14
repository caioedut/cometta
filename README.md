<div align="center">
  <h1>
    <br>
    ☄ Cometta
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

## Usage

```js
import cometta from 'cometta';

const styles = cometta.create({
   container: {
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     height: '100vh',
     width: '100vh',
   },
});

```

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
