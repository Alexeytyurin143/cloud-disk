import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useDispatch } from 'react-redux'
import { setFiles } from '../store/filesSlice'

export const SearchInput = ({ searchFiles }) => {
	const [search, setSearch] = useState('')
	const searchDebounce = useDebounce(search, 500)
	const dispatch = useDispatch()

	useEffect(() => {
		const handleSearch = async () => {
			const payload = await searchFiles(searchDebounce).unwrap()
			dispatch(setFiles(payload))
		}
		handleSearch()
	}, [searchDebounce])

	return (
		<TextField
			variant='standard'
			label='Поиск'
			sx={{
				margin: '0 auto!important',
				minWidth: '350px',
			}}
			value={search}
			onChange={(e) => setSearch(e.target.value)}
		/>
	)
}
