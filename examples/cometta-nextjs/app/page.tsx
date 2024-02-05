'use client';

import { create, jss, sheet, variables } from '../../../src';

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
    fontSize: 48,
    color: 'var(primary)',
    marginBottom: 32,
  },
  button: {
    cursor: 'pointer',
    border: '1px solid var(secondary)',
    background: 'linear-gradient(to bottom right, var(secondary), var(primary) 75%)',
    'border-radius': 16,
    color: '#FFFFFF',
    padding: '16px 32px',
    fontWeight: 'bold',
    text_align: 'center',
    '&:hover': {
      background: 'linear-gradient(to bottom right, var(secondary), var(secondary) 75%)',
    },
  },
});

export default function Page() {
  return (
    <main className={sheet(styles.container)}>
      <div className={sheet(styles.icon)}>☄ Cometta</div>
      <button className={sheet(styles.button)}>Using "class"</button>
      <button style={jss(styles.button)}>Using "style"</button>
    </main>
  );
}
