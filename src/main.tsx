import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";

import './index.scss'
import FirstView from './component/screens/FirstView';
import SelectGuestNumber from './component/screens/SelectGuestNumber'
import Menu from './component/screens/Menu';
import { AppProvider } from './context/AppContext';

const router = createBrowserRouter([
  { path: "/", Component: FirstView },
  { path: "selectGuestNumber", Component: SelectGuestNumber },
  { path: "menu", Component: Menu }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)

