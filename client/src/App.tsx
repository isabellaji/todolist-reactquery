import Router from 'routes/Router';
import { themeState } from 'store/atoms';
import { GlobalStyle } from 'styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { darkTheme, lightTheme } from 'styles/theme';

function App() {
  const isDark = useRecoilValue(themeState);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
