import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MainComponent from './components/MainComponent';
import AuthContext from './context/login-context';
import React, {useState} from 'react';
import RoleContext from './context/role-context';


function App() {
    const [accountId, setAccountId] = useState(0);
    const [role, setRole] = useState("");

  return (
    <AuthContext.Provider 
                value={{
                    // for logging in we set these values
                    accountId, setAccountId
                }}>
    <RoleContext.Provider
                value={{
                    role, setRole
                }}>
      <div>
          <div className="d-flex justify-content-center">
              <div className="border  bg-primary-subtle">
                  <MainComponent></MainComponent>
              </div>
          </div>
      </div>
    </RoleContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
