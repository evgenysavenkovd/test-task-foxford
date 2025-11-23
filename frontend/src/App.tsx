import { RootRouter } from './navigation/root-router';
import { Providers } from './providers';

export const App = () => {
  return (
    <Providers>
      <RootRouter />
    </Providers>
  );
};
