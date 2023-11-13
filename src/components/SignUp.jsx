import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import { useRegistrationMutation } from '../api/user'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export const SignUp = () => {
	const theme = useTheme()
	const navigate = useNavigate()
	const isAuth = useSelector((state) => state.user.isAuth)
	const { register, handleSubmit } = useForm()
	const [registration] = useRegistrationMutation()

	const onSubmit = async (formData) => {
		try {
			const payload = await registration(formData).unwrap()
			alert(payload.message)
			navigate('/login')
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
					Регистрация
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					sx={{ mt: 1 }}
				>
					<TextField
						margin='normal'
						required
						fullWidth
						type='email'
						label='Email'
						name='email'
						id='email'
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
						autoComplete='new-password'
						{...register('password')}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Зарегистрироваться
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Link
								component={RouterLink}
								to='/login'
								variant='body2'
								sx={{
									[theme.breakpoints.up('sm')]: {
										display: 'none',
									},
								}}
							>
								Уже есть аккаунт? Войти
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}
