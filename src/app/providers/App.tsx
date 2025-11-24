import { RouterProvider } from 'react-router';

import '../global/App.css';
import { router } from '../routes/router';

import QueryProvider from './QueryProvider';

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
