import { Outlet } from 'react-router';

import { Card } from '@/components/ui/card';

export const AuthContainer = () => {
  return (
    <div className='container mx-auto flex h-full items-center justify-center'>
      <div className='w-full max-w-lg'>
        <Card>
          <Outlet />
        </Card>
      </div>
    </div>
  );
};
