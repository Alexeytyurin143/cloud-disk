import { useLocation, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthQuery } from '../api/user'
import { useEffect } from 'react'
import { logOut, setUser } from '../store/userSlice'
import { setTheme } from '../store/appSlice'
import { Box, CircularProgress } from '@mui/material'

export const RequireAuth = ({ children }) => {
	const dispatch = useDispatch()
	const location = useLocation()
	const isAuth = useSelector((state) => state.user.isAuth)

	return isAuth ? (
		<>{children}</>
	) : (
		<Navigate to='/login' state={{ from: location }} />
	)
}
