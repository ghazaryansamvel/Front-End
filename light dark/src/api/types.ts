/*
 * The SwitcherProps interface defines the structure of the props
 * that the Switcher component expects. It includes a render function
 * that takes in two arguments: isDark (boolean) and toggleTheme (function).
 */

import { ReactNode } from "react"

export interface SwitcherProps {
    render: (isDark: boolean, toggleTheme: () => void) => ReactNode;
}