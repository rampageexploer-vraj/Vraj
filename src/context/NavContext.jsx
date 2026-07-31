import React, { createContext, useState } from 'react';

export const NavbarContext = createContext();
export const NavbarColorContext = createContext();

export const NavbarProvider = ({ children }) => {
    const [navOpen, setNavOpen] = useState(false);
    const [navColor, setNavColor] = useState('white');

    return (
        <NavbarContext.Provider value={[navOpen, setNavOpen]}>
            <NavbarColorContext.Provider value={[navColor, setNavColor]}>
                {children}
            </NavbarColorContext.Provider>
        </NavbarContext.Provider>
    );
};
