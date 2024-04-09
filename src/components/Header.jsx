import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import IconButton from '@mui/material/IconButton'
import { Link, useNavigate } from 'react-router-dom'
import { ColorToggler } from './ColorToggler'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/userSlice'
import { filesApi } from '../api/files'
import { baseUrl } from '../api/config'

export const Header = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isAuth = useSelector((state) => state.user.isAuth)
	const currentUser = useSelector((state) => state.user.currentUser)

	const logOutHandler = () => {
		dispatch(filesApi.util.resetApiState())
		dispatch(logOut())
		navigate('/login', { replace: true })
	}

	return (
		<AppBar
			position='static'
			color='default'
			elevation={1}
			sx={{ marginBottom: 4 }}
		>
			<Toolbar sx={{ flexWrap: 'wrap', paddingY: 1 }}>
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
						<Link to='/profile'>
							<IconButton>
								{currentUser.avatar ? (
									<img
										src={`${baseUrl}/${currentUser.avatar}`}
										alt='Аватар'
										style={{
											width: '35px',
											height: '35px',
											borderRadius: '50%',
											objectFit: 'cover',
										}}
									/>
								) : (
									<AccountCircleIcon fontSize='large' />
								)}
							</IconButton>
						</Link>
						<Button
							variant='outlined'
							onClick={logOutHandler}
							sx={{
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
