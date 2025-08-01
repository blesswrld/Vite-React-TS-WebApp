import React, { createContext, useState } from "react";

interface IModalContext {
    modal: boolean;
    open: () => void;
    close: () => void;
}

export const ModalContext = createContext<IModalContext>({
    modal: false,
    open: () => {},
    close: () => {},
});

interface ModalStateProps {
    children: React.ReactNode;
}

export const ModalState: React.FC<ModalStateProps> = ({ children }) => {
    const [modal, setModal] = useState(false);

    const open = () => setModal(true);
    const close = () => setModal(false);

    return (
        <ModalContext.Provider value={{ modal, open, close }}>
            {children}
        </ModalContext.Provider>
    );
};
