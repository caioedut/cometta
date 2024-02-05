import { Dimensions, Pressable, Text, View } from 'react-native';
import { create, jss, polyfill, variables } from 'cometta';

polyfill({
  screenWidth: Dimensions.get('window').width,
  screenHeight: () => Dimensions.get('window').height,
});

variables({
  primary: '#FF4500',
  secondary: '#FF8C00',
  tertiary: '#FFA500',
});

const styles = create({
  container: {
    backgroundColor: '#E8C897',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    gap: 16,
    padding: 16,
    '@media (min-width: 769px)': {
      backgroundColor: '#FFEBCD',
    },
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
    <View style={jss(styles.container)}>
      <Text style={jss(styles.icon)}>☄ Cometta</Text>
      <Pressable style={jss(styles.button)}>
        <Text style={jss(styles.buttonTitle)}>Using JSS "style"</Text>
      </Pressable>
    </View>
  );
}
