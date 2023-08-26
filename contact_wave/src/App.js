import Layout from './components/layout';
import {Routes as Switch,Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateContact from "./pages/CreateContact";
import { AuthContextProvider } from './context/AuthContext';

import { ToastContextProvider } from './context/ToastContext';
import AllContact from './pages/AllContact';
import EditContact from "./pages/EditContact";



const App= () => {
  return ( 
    <ToastContextProvider>
  <AuthContextProvider>
    
  <Layout>
    <Switch>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/create" element={<CreateContact />} />
      <Route path="/mycontacts" element={<AllContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Switch>
  </Layout>
  
  </AuthContextProvider>
  </ToastContextProvider>
  );
};

export default App;