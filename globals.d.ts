import '@testing-library/jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

declare module '*.png';

declare module '*.svg' {
  const content: unknown;
  export default content;
}
