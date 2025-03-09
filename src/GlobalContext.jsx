import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // Initialize state from localStorage, or an empty array if not found
  const [userInputs, setUserInputs] = useState(() => {
    const storedUserInputs = localStorage.getItem("userInputs");
    return storedUserInputs ? JSON.parse(storedUserInputs) : [];
  });

  // Whenever userInputs changes, update localStorage
  useEffect(() => {
    localStorage.setItem("userInputs", JSON.stringify(userInputs));
  }, [userInputs]);

  const addUserInput = (input) => {
    setUserInputs((prev) => [...prev, input]);
  };

  return (
    <GlobalContext.Provider value={{ userInputs, addUserInput }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
