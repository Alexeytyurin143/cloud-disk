import { useSelector } from 'react-redux'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { File } from './File'

export const FileList = () => {
	const files = useSelector((state) => state.files.files)

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell sx={{ width: '50%' }}>Имя файла</TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell>Дата создания</TableCell>
						<TableCell>Размер</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{files.map((file) => (
						<File key={file._id} file={file} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
