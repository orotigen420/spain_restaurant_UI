import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useLocation, useOutlet, Outlet } from "react-router";
import { AnimatePresence, motion } from 'framer-motion';

import './index.scss'
import FirstView from './component/screens/FirstView';
import SelectGuestNumber from './component/screens/SelectGuestNumber'
import Menu from './component/screens/Menu';
import InsideCart from './component/screens/InsideCart';
import OrderHistory from './component/screens/OrderHistory';
import { AppProvider } from './context/AppContext';

//参考:https://zenn.dev/bloomer/articles/3a814d9f054198
function PageTransitionLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  const isTransitionTarget = location.pathname === "/" || location.pathname === "/selectGuestNumber";

  if (!isTransitionTarget) {
    return <Outlet />;
  }

  return (
    <AnimatePresence mode="popLayout">
      {outlet && (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        >
          {outlet}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageTransitionLayout />,
    children: [
      { path: "", Component: FirstView },
      { path: "selectGuestNumber", Component: SelectGuestNumber },
      { path: "menu", Component: Menu },
      { path: "insideCart", Component: InsideCart },
      { path: "orderHistory", Component: OrderHistory }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)

