import { useContext, useState, createContext } from 'react'; 
import { baseUrl, baseAuthUrl } from '../../utils/constants';

const setPassword = async(form)  => {
  return await fetch(`${baseUrl}password-reset/reset`, {
    mode: 'no-cors',
    cache: 'np-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

const registerRequest = async form => {
  return await fetch(`${baseAuthUrl}/register`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

const loginRequest = async form => {
  return await fetch(`${baseAuthUrl}/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

const fakeAuth = {
  isAuthenticated: false,
  signIn(form) {
    fakeAuth.isAuthenticated = true;
    setTimeout(form, 100); // fake async
  },
  signOut(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);


  const register = async form => {
    const data = await registerRequest(form) 
    .then(res => res.json())
    .then(data => data);
    console.log(data)
    if (data.success) {
      setUser({ ...data.user, accessToken: data.accessToken });
    }
  }

  const signIn = async form => {
    const data = await loginRequest(form)
      .then(res => res.json())
      .then(data => data);
    if (data.success) {
      setUser({ ...data.user, id: data.user._id });
      
    }
  };

  const signOut = cb => {
    return fakeAuth.signOut(() => {
      setUser(null);
      cb();
    });
  };
  console.log(user)

  return {
    user,
    email,
    signIn,
    signOut,
    register,
    setPassword
  };
}