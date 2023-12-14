import { Dimensions, Pressable, Text, View } from 'react-native';
import cometta from 'cometta';

cometta.polyfill({
  units: {
    rem: 16, // 1rem = 16px
    vw: (value) => (value * Dimensions.get('window').width) / 100,
    vh: (value) => (value * Dimensions.get('window').height) / 100,
  },
});

cometta.variables({
  primary: '#FF4500',
  secondary: '#FF8C00',
  tertiary: '#FFA500',
});

const styles = cometta.create({
  container: {
    backgroundColor: '#FFEBCD',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    gap: 16,
    padding: 16,
  },
  icon: {
    fontSize: '2rem',
    color: 'var(primary)',
    marginBottom: 32,
  },
  button: {
    border: '1px solid var(secondary)',
    backgroundColor: 'var(secondary)',
    'border-radius': 16,
    padding: '16px 32px',
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    text_align: 'center',
  },
});

export default function App() {
  return (
    <View style={cometta.jss(styles.container)}>
      <Text style={cometta.jss(styles.icon)}>☄ Cometta</Text>
      <Pressable style={cometta.jss(styles.button)}>
        <Text style={cometta.jss(styles.buttonTitle)}>Using JSS "style"</Text>
      </Pressable>
    </View>
  );
}
