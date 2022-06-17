import React, { createContext} from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { useLocalStorage } from './hooks/useLocalStorage';

export const CurrentUserContext = createContext(null);
export const CurrentUserDispatchContext = createContext(()=> ({}));

function Provider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null)
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserDispatchContext.Provider value={setCurrentUser}>
        {children}
      </CurrentUserDispatchContext.Provider>
    </CurrentUserContext.Provider>
  );
}

function App() {
  const {pathname} = useLocation()
  return (
    <Provider>
      <div className="w-fulll min-h-screen bg-light ">
        <Header/>
        <main className='container py-10'>
          {pathname === "/" ?
            <h2 className="text-2xl font-bold text-black">Home</h2>
            :<Outlet/>
          }
        </main>
      </div>
    </Provider>
  );
}

export default App;
