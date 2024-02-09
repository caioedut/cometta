<script>
    import cometta from 'cometta';

    cometta.normalize();

    cometta.variables({
      primary: '#FF4500',
      secondary: '#FF8C00',
      tertiary: '#FFA500',
    });

    const styles = cometta.create({
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
</script>

<main class={cometta.sheet(styles.container)}>
    <div class={cometta.sheet(styles.icon)}>☄ Cometta</div>
    <button class={cometta.sheet(styles.button)}>Using "class"</button>
    <button style={cometta.css(styles.button)}>Using "style"</button>
</main>
