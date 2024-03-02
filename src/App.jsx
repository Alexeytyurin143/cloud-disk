import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Layout } from './components/Layout'
import { Main } from './components/Main'
import { RequireAuth } from './components/RequireAuth'
import { Profile } from './components/Profile'
import { NotFound } from './components/NotFound'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthQuery } from './api/user'
import { useEffect } from 'react'
import { logOut, setUser } from './store/userSlice'
import { Box, CircularProgress } from '@mui/material'

function App() {
	const dispatch = useDispatch()
	const { data, isFetching, isError } = useAuthQuery()
	const isAuth = useSelector((state) => state.user.isAuth)

	useEffect(() => {
		if (isError) {
			dispatch(logOut())
		}
	}, [isError])

	useEffect(() => {
		if (data) {
			if (!isAuth) {
				dispatch(setUser(data))
			}
		}
	}, [data])

	if (isFetching) {
		return (
			<Box
				height='100vh'
				display='flex'
				alignItems='center'
				justifyContent='center'
			>
				<CircularProgress size={120} />
			</Box>
		)
	}

	return (
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
	)
}

export default App
