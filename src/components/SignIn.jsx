import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../api/user'
import { setUser } from '../store/userSlice'
import { useEffect } from 'react'

export const SignIn = () => {
	const theme = useTheme()
	const isAuth = useSelector((state) => state.user.isAuth)
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm()
	const [login] = useLoginMutation()

	const fromPage = location.state?.from?.pathname || '/'
	console.log(fromPage)

	const onSubmit = async (formData) => {
		try {
			const payload = await login(formData).unwrap()
			dispatch(setUser(payload.user))
			localStorage.setItem('token', payload.token)
			navigate(fromPage, { replace: true })
		} catch (error) {
			alert(error.data.message)
		}
	}

	useEffect(() => {
		if (isAuth) {
			navigate(-1)
		}
	}, [])

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Вход
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					sx={{ mt: 1 }}
				>
					<TextField
						margin='normal'
						type='email'
						required
						fullWidth
						id='email'
						label='Email'
						name='email'
						autoComplete='email'
						{...register('email')}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Пароль'
						type='password'
						id='password'
						autoComplete='current-password'
						{...register('password')}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{
							mt: 3,
							mb: 2,
						}}
					>
						Войти
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Link
								component={RouterLink}
								to='/registration'
								variant='body2'
								sx={{
									[theme.breakpoints.up('sm')]: {
										display: 'none',
									},
								}}
							>
								Ещё нет аккаунта? Зарегистрироваться
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}
