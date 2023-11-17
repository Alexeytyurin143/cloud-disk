import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { orange, deepOrange } from '@mui/material/colors'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Layout } from './components/Layout'
import { useSelector } from 'react-redux'
import { Main } from './components/Main'
import { RequireAuth } from './components/RequireAuth'
import { Profile } from './components/Profile'
import { NotFound } from './components/NotFound'

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
	components: {
		MuiButton: {
			styleOverrides: {
				text: () => ({
					padding: '8px',
					lineHeight: 'normal',
				}),
			},
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

function App() {
	const darkMode = useSelector((state) => state.app.darkMode)

	return (
		<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route path='registration' element={<SignUp />} />
						<Route path='login' element={<SignIn />} />
						<Route
							index
							element={
								<RequireAuth>
									<Main />
								</RequireAuth>
							}
						/>
						<Route
							path='profile'
							element={
								<RequireAuth>
									<Profile />
								</RequireAuth>
							}
						/>
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
