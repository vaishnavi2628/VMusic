import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx"
import AuthCallbackPage from"./pages/auth-callback/AuthCallbackPage.jsx"




function App() {

  return (
    <>
    <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/auth-callback" element={<AuthCallbackPage/>}></Route>

    </Routes>
    
    
    </>
  );
}

export default App;