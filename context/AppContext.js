import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [onboardingStatus, setOnboardingStatus] = useState(null);

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        onboardingStatus,
        setOnboardingStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
