/*
 * The Switcher component manages the theme state (light or dark) and 
 * passes it along with the toggleTheme function to the render prop.
 */

import { FC, useState } from "react"
import { SwitcherProps } from "../api/types";

export const Switcher: FC<SwitcherProps> = ({ render }) => {

    /*
     * darkTheme is a boolean state that tracks whether the dark theme is active.
     * Initially, it is set to false (light theme).
     */
    const [darkTheme, setDarkTheme] = useState(false);

    /*
     * The toggleTheme function switches the theme by toggling the value
     * of darkTheme. If darkTheme is true, it becomes false, and vice versa.
     */
    const toggleTheme = () => {
        setDarkTheme(prevTheme => !prevTheme);
    }

    /*
     * The render prop is called with the current darkTheme state and the toggleTheme
     * function, allowing the parent component to determine how to display the UI.
     */
    return <>
        {
            render(darkTheme, toggleTheme)
        }
    </>
}