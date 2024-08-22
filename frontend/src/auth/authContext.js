import { createContext, useState } from 'react';

let resetLogoutTimer;

const AuthContext = createContext({
    token: '',
    isUserLoggedIn: false,
    userRole: '',
    login: user => {},
    logout: () => {}
})

export const AuthContextProvider = props => {
    const localtoken = localStorage.getItem('jwtToken');
    const localExpiryDate = localStorage.getItem('expiryDate');
    const localUserRole = localStorage.getItem('userRole');
     //const userId = localStorage.getItem('userId');
    const [token, setToken] = useState(localtoken);
    const [userRole, setUserRole] = useState(localUserRole);
    // const [expiryDate, setExpiryDate] = useState(localExpiryDate);
    let userLoggedIn = !!token;

    const calculateRemainingTime = expiryDate => {
        const currentTime = new Date().getTime();
        const adjExpiryDate = new Date(expiryDate).getTime();
        const remainingTime = adjExpiryDate - currentTime;
        return remainingTime;
    };

    const logOutHandler = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('expiryDate');
        setToken(null);
        if( resetLogoutTimer) {
            clearTimeout(resetLogoutTimer);
        }
    }

    const loginHandler = user => {
        localStorage.setItem('jwtToken', user.token);
        localStorage.setItem('userId', user.userId);
        localStorage.setItem('userRole', user.userRole);
        const remainingMilliseconds = 7 * 24 * 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        setToken(user.token);
        setUserRole(user.userRole);
        userLoggedIn = true;
    
        const remainingTime = calculateRemainingTime(expiryDate);
    
        resetLogoutTimer = setTimeout(logOutHandler, remainingTime);
      };
    
      const authContextValue = {
        token: token,
        login: loginHandler,
        isUserLoggedIn: userLoggedIn,
        userRole: userRole,
        logout: logOutHandler,
      };

      return (
        <AuthContext.Provider value={authContextValue}>
            {props.children}
        </AuthContext.Provider>
      )
}

export default AuthContext;