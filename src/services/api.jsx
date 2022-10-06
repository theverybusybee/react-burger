import { baseAuthUrl } from "../utils/constants";

export const loginRequest = async (form) => {
  return await fetch(`${baseAuthUrl}/login`, {
    method: "POST", // POST is used to send data to a server to create/update a resource
    mode: "cors", // Allows cross-origin requests, for example to access various APIs offered by 3rd party vendors
    cache: "no-cache", // no-cache allows caches to store a response but requires them to revalidate it before reuse
    credentials: "same-origin", // Send user credentials (cookies, basic http auth, etc..) if the URL is on the same origin as the calling script. This is the default value
    headers: {
      "Content-type": "application/json", // Indicates that the request body format is JSON
    },
    redirect: "follow", // the default, follow HTTP-redirects
    referrerPolicy: "no-referrer", // never send Referer
    body: JSON.stringify(form),
  });
};

