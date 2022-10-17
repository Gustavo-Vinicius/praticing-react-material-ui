import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DarkTheme, LightTheme } from "../themes";
import { Box, ThemeProvider} from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";
import { useTheme } from "@emotion/react";
import { useTabContext } from "@mui/base";


interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData)

interface IAppThemeProviderProps {
    children: React.ReactNode
}

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {

    const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light')
    }, []);

    const theme = useMemo(() =>{
        if(themeName === 'light') return LightTheme

        return DarkTheme
    }, [themeName])

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width='100vw' height='100vh' bgcolor = {theme.palette.background.default}>
                {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}