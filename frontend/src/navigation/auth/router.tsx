import { createBrowserRouter } from 'react-router';

import { AuthContainer } from './AuthContainer';
import { SignInScreen, SignUpScreen } from './screens';

export const authRouter = createBrowserRouter([
  {
    Component: AuthContainer,
    children: [
      {
        index: true,
        Component: SignInScreen,
      },
      {
        path: '/sign-up',
        Component: SignUpScreen,
      },
    ],
  },
]);
