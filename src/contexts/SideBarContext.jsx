import { createContext, useContext, useState } from "react";

const SideBarContext = createContext();

export default function useSideBar() {
  return useContext(SideBarContext);
}

export function SideBarProvider({ children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <SideBarContext.Provider
      value={{
        handleShow,
        handleClose,
        show,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
}
