import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import FolderIcon from '@mui/icons-material/Folder'
import dayjs from 'dayjs'

export const File = ({ file }) => {
	return (
		<TableRow>
			<TableCell align='right'>
				{file.type === 'dir' ? <FolderIcon /> : <InsertDriveFileIcon />}
			</TableCell>
			<TableCell>{file.name}</TableCell>
			<TableCell></TableCell>
			<TableCell></TableCell>
			<TableCell>{dayjs(file.date).format('DD.MM.YYYY HH:mm')}</TableCell>
			<TableCell>{file.size}</TableCell>
		</TableRow>
	)
}
