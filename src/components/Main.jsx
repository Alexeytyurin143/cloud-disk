import { useGetFilesQuery } from '../api/files'
import { useDispatch, useSelector } from 'react-redux'
import { FileList } from './FileList/FileList'
import { useEffect } from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { setFiles } from '../store/filesSlice'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const Main = () => {
	const dispatch = useDispatch()
	const currentDir = useSelector((state) => state.files.currentDir)

	const { isError, isFetching, data, refetch } = useGetFilesQuery(currentDir)

	useEffect(() => {
		refetch()
		if (data) {
			dispatch(setFiles(data))
		}
	}, [currentDir, data])

	return (
		<Container sx={{ my: 2 }}>
			<Stack direction='row' spacing={1} mb={1}>
				<Button startIcon={<ArrowBackIcon />}>Назад</Button>
				<Button startIcon={<AddIcon />}>Создать папку</Button>
			</Stack>
			{isFetching ? (
				<CircularProgress />
			) : isError ? (
				<>
					<Typography>Ошибка</Typography>
					<Button onClick={refetch}>Попробовать снова</Button>
				</>
			) : data ? (
				<FileList />
			) : null}
		</Container>
	)
}
