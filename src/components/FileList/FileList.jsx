import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { File } from './File'
import { setFiles } from '../../store/filesSlice'
import { useGetFilesQuery } from '../../api/files'
import { Box, CircularProgress } from '@mui/material'

export const FileList = () => {
	const files = useSelector((state) => state.files.files)
	const dispatch = useDispatch()
	const currentDir = useSelector((state) => state.files.currentDir)
	const sort = useSelector((state) => state.files.sort)

	const { isFetching, isError, data, refetch } = useGetFilesQuery({
		dirId: currentDir,
		sort,
	})

	useEffect(() => {
		refetch()
		if (data) {
			dispatch(setFiles(data))
		}
	}, [currentDir, data, sort])

	if (isFetching) {
		return (
			<Box
				marginTop={5}
				display='flex'
				alignItems='center'
				justifyContent='center'
			>
				<CircularProgress size={120} />
			</Box>
		)
	}

	return (
		<>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={{ width: '5%' }}></TableCell>
							<TableCell sx={{ width: '50%' }}>
								Имя файла
							</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell>Дата создания</TableCell>
							<TableCell>Размер</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{isError ? (
							<>
								<Typography>Ошибка</Typography>
								<Button onClick={refetch}>
									Попробовать снова
								</Button>
							</>
						) : data ? (
							<>
								{files.map((file) => (
									<File key={file._id} file={file} />
								))}
							</>
						) : null}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
