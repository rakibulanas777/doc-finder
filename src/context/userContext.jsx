import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, getUser] = useState(null);
  console.log(user);
  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
const useUserContext = () => {
  return useContext(UserContext);
};
export { UserProvider, useUserContext };
