import { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext, CurrentUserDispatchContext } from "../App";

export default function Header() {
  const currentUser = useContext(CurrentUserContext);
  const setCurrentUser = useContext(CurrentUserDispatchContext);
  const navigate = useNavigate();
  const {pathname} = useLocation()

  function logout() {
    setCurrentUser(null)
    navigate("/login")
  }
  
  useEffect(() => {
    if(!currentUser && pathname === "/posts"){
      navigate("/login")
    }
  }, [currentUser, navigate, pathname])
  

  return (
  <header className="w-full py-4 bg-white shadow-md shadow-gray-200/50">
    <div className="container flex justify-between items-center">
      <Link to="/">
        <h1 className="text-xl font-bold text-black">Logo</h1>
      </Link>
      <nav className="flex items-center gap-4">
        <Link to="/" className="text-primary">Home</Link>
        {currentUser ?
            <>
              <Link to="/posts" className="text-primary">Posts</Link>
              <button onClick={logout} className="bg-primary text-white rounded-md px-4 py-1">Logout</button>
            </>
            :<Link to="/login" className="text-primary">Login</Link> 
          }
      </nav>
    </div>
  </header>
  )
}