import React, { ReactNode } from "react";

interface ModalWrapperProps {
  children: ReactNode;
}
// Modal Wrapper představuje pozadí (blackdrop) a samotný modal block
export const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  return (
    // modal backdrop → pozadí kolem modalu, na které když kliknu tak se modal zavře
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="absolute flex flex-col gap-4 bg-white p-10 rounded-2xl border-2 border-solid border-dark shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
        // e.stopPropagation() zamezí provedení eventu v nadřazeném tagu, takže se modal nezavře při kliknutí do něj
      >
        {children}
      </div>
    </div>
  );
};
