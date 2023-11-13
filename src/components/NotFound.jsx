import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'

export const NotFound = () => {
	return (
		<>
			<Typography variant='h3'>Страница не найдена</Typography>
			<Link component={RouterLink} to='/'>
				Вернуться на главную
			</Link>
		</>
	)
}
