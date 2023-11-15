import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { Link, useNavigate } from 'react-router-dom'
import { ColorToggler } from './ColorToggler'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/userSlice'

export const Header = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isAuth = useSelector((state) => state.user.isAuth)

	const logOutHandler = () => {
		dispatch(logOut())
		navigate('/login', { replace: true })
	}

	return (
		<AppBar position='static' color='default' elevation={0}>
			<Toolbar sx={{ flexWrap: 'wrap' }}>
				<Typography
					variant='h6'
					color='inherit'
					noWrap
					sx={{ flexGrow: 1 }}
				>
					Cloud Disk
				</Typography>
				{isAuth ? (
					<>
						<Link to='/profile'>Профиль</Link>
						<Button
							variant='outlined'
							onClick={logOutHandler}
							sx={{
								my: 1,
								mx: 1.5,
							}}
						>
							Выйти
						</Button>
					</>
				) : (
					<>
						<Button
							component={Link}
							to='/login'
							variant='outlined'
							sx={{
								my: 1,
								mx: 1.5,
								display: {
									xs: 'none',
									sm: 'block',
								},
							}}
						>
							Войти
						</Button>
						<Button
							component={Link}
							to='/registration'
							variant='outlined'
							sx={{
								my: 1,
								mx: 1.5,
								display: {
									xs: 'none',
									sm: 'block',
								},
							}}
						>
							Зарегистрироваться
						</Button>
					</>
				)}
				<ColorToggler />
			</Toolbar>
			<Divider />
		</AppBar>
	)
}
