import { useDispatch, useSelector } from "react-redux";
import { baseAuthUrl } from "../../utils/constants";
import { FETCH_AUTH_SUCCESS, SET_USER_NULL } from "../actions/auth";
import { setCookie } from "../../utils/cookie";

const loginRequest = async (form) => {
  return await fetch(`${baseAuthUrl}/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
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
  },
};

export function useAuth() {
  const dispatch = useDispatch();

  const signIn = (form) => {
    const data = loginRequest(form)
      .then((res) => {
        let authToken;
        res.headers.forEach((header) => {
          if (header.indexOf("Bearer") === 0) {
            authToken = header.split("Bearer ")[1];
          }
        });
        if (authToken) {
          setCookie("token", authToken);
        }
        return res.json();
      })
      .then((data) => data);
    if (data.success) {
      dispatch({ type: FETCH_AUTH_SUCCESS });
    }
  };

  const signOut = (cb) => {
    return fakeAuth.signOut(() => {
      dispatch({ type: SET_USER_NULL });
      cb();
    });
  };

  return {
    signIn,
    signOut,
  };
}
