import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { orange, deepOrange } from '@mui/material/colors'

export const Theme = ({ children }) => {
	const darkMode = useSelector((state) => state.app.darkMode)

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: orange[500],
			},
			secondary: {
				main: deepOrange['A200'],
			},
		},
	})

	const lightTheme = createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: orange[800],
			},
			secondary: {
				main: deepOrange['A400'],
			},
		},
	})

	return (
		<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}
