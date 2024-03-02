import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import FolderIcon from '@mui/icons-material/Folder'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurrentDir } from '../../store/filesSlice'
import { formatFileSize } from '../../utils/fileSize'

export const File = ({ file }) => {
	const dispatch = useDispatch()
	const currentDir = useSelector((state) => state.files.currentDir)
	const openDirHandler = () => {
		if (file.type === 'dir') {
			dispatch(pushToStack(currentDir))
			dispatch(setCurrentDir(file._id))
		}
	}

	return (
		<TableRow
			sx={{
				':hover': {
					backgroundColor: 'action.hover',
					cursor: 'pointer',
				},
			}}
			onClick={openDirHandler}
		>
			<TableCell align='right'>
				{file.type === 'dir' ? <FolderIcon /> : <InsertDriveFileIcon />}
			</TableCell>
			<TableCell>{file.name}</TableCell>
			<TableCell></TableCell>
			<TableCell></TableCell>
			<TableCell>{dayjs(file.date).format('DD.MM.YYYY HH:mm')}</TableCell>
			<TableCell>{formatFileSize(file.size)}</TableCell>
		</TableRow>
	)
}
