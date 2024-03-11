import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const RequireAuth = ({ children }) => {
	const location = useLocation()
	const isAuth = useSelector((state) => state.user.isAuth)

	return isAuth ? (
		<>{children}</>
	) : (
		<Navigate to='/login' state={{ from: location }} />
	)
}
