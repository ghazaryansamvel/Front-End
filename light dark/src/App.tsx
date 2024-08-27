import React from 'react';
import { Switcher } from './component/Switcher';

/*
 * This is the main App component, which renders the Switcher.
 * Switcher allows switching between light and dark themes.
 */
const App: React.FC = () => {
  return (
    <Switcher
      /*
       * The render function inside Switcher decides how the UI should look
       * based on whether the darkTheme is active or not. It also provides a button
       * to toggle between light and dark themes.
       */
      render={(darkTheme, toggleTheme) => (
        <div
          style={{
            /*
             * The background color and text color change based on the current theme.
             * darkTheme ? '#333' : '#FFF' means that if darkTheme is true, the background
             * will be dark (#333), otherwise it will be light (#FFF).
             */
            backgroundColor: darkTheme ? '#333' : '#FFF',
            color: darkTheme ? '#FFF' : '#000',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <h1>{darkTheme ? 'Dark Theme' : 'Light Theme'}</h1>
          <button onClick={toggleTheme} style={{
            /*
             * The button's background and text color also change with the theme,
             * making the UI consistent in both dark and light modes.
             */
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: darkTheme ? '#FFF' : '#333',
            color: darkTheme ? '#333' : '#FFF',
            border: 'none',
            borderRadius: '5px'
          }}>
            Toggle Theme
          </button>
        </div>
      )}
    />
  );
};

export default App;