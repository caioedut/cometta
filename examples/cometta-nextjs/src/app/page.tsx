'use client';

import cometta from '../../../../src';

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
    fontSize: 48,
    color: 'var(primary)',
    marginBottom: 32,
  },
  button: {
    cursor: 'pointer',
    border: '1px solid var(secondary)',
    background:
      'linear-gradient(to bottom right, var(secondary), var(primary) 75%)',
    'border-radius': 16,
    color: '#FFFFFF',
    padding: '16px 32px',
    fontWeight: 'bold',
    text_align: 'center',
    '&:hover': {
      background:
        'linear-gradient(to bottom right, var(secondary), var(secondary) 75%)',
    },
  },
});

export default function Home() {
  return (
    <main className={cometta.sheet(styles.container)}>
      <div className={cometta.sheet(styles.icon)}>☄ Cometta</div>
      <button className={cometta.sheet(styles.button)}>Using "class"</button>
      <button style={cometta.jss(styles.button)}>Using "style"</button>
    </main>
  );
}
