import React, {  ReactNode, createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  userId: string | null;
  setUserId: (id:string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem('userId');
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    }
    else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{userId, setUserId}}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context
}

export { UserProvider, useUser };