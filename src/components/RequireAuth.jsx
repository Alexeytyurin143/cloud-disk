import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const RequireAuth = ({ children }) => {
	const location = useLocation()
	const isAuth = useSelector((state) => state.user.isAuth)

	if (!isAuth) {
		return <Navigate to='/login' state={{ from: location }} />
	}
	return children
}
