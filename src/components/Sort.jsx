import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { setSort } from '../store/filesSlice'
import { useDispatch, useSelector } from 'react-redux'

export const Sort = () => {
	const dispatch = useDispatch()
	const sort = useSelector((state) => state.files.sort)
	const handleChange = (event) => {
		dispatch(setSort(event.target.value))
	}

	return (
		<Box sx={{ minWidth: 150 }}>
			<FormControl fullWidth size='small'>
				<InputLabel id='sort-label'>Сортировка</InputLabel>
				<Select
					labelId='sort-label'
					id='sort'
					value={sort}
					label='Сортировка'
					onChange={handleChange}
				>
					<MenuItem value='name'>По имени</MenuItem>
					<MenuItem value='type'>По типу</MenuItem>
					<MenuItem value='date'>По дате</MenuItem>
				</Select>
			</FormControl>
		</Box>
	)
}
