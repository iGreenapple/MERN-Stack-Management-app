import { createContext, ReactNode, useContext, useReducer } from "react";

// REDUCER
interface ModalState {
  signup_AuthModalOpen: boolean;
  login_AuthModalOpen: boolean;
  create_ProjectModalOpen: boolean;
  create_TaskModalOpen: boolean;
}

// type ModalType = "auth" | "project" | "task";

// keyof říká, že payload.modalname mlůže být pouze jednou z key hodnot v ModalState, tedy název modalu
type ModalAction = { type: "TOGGLE_MODAL"; payload: { modalName: keyof ModalState; isOpen: boolean } };

const initialState: ModalState = {
  signup_AuthModalOpen: false,
  login_AuthModalOpen: false,
  create_ProjectModalOpen: false,
  create_TaskModalOpen: false,
};
// Tento reduktor aktualizuje stav příslušného modalu podle názvu, který je specifikován v action.payload.modalName, a nastaví jeho stav na hodnotu isOpen.
const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return {
        ...state,
        [action.payload.modalName]: action.payload.isOpen,
      };
    default:
      return state;
  }
};

interface ModalContextType {
  state: ModalState;
  openModal: (modalName: keyof ModalState) => void;
  closeModal: (modalName: keyof ModalState) => void;
}

// CONTEXT
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (modalName: keyof ModalState) => {
    dispatch({ type: 'TOGGLE_MODAL', payload: { modalName, isOpen: true } });
  };

  const closeModal = (modalName: keyof ModalState) => {
    dispatch({ type: 'TOGGLE_MODAL', payload: { modalName, isOpen: false } });
  };
  // Context provider poskytuje v tomto případě state z reduceru a pak funkce openModal a closeModal
  return <ModalContext.Provider value={{ state, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

// Custom hook pro přístup do ModalContext
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
