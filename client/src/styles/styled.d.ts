import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    subBgColor: string;
    textColor: string;
    accentColor: string;
    subAccentColor: string;
    borderColor: string;
  }
}
