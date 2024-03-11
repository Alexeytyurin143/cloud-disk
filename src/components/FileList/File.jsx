import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import FolderIcon from '@mui/icons-material/Folder'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import {
	deleteFileAction,
	pushToStack,
	setCurrentDir,
} from '../../store/filesSlice'
import { formatFileSize } from '../../utils/fileSize'
import { Button } from '@mui/material'
import { download, useDeleteFileMutation } from '../../api/files'

export const File = ({ file }) => {
	const dispatch = useDispatch()
	const currentDir = useSelector((state) => state.files.currentDir)
	const [deleteFile] = useDeleteFileMutation()

	const openDirHandler = () => {
		if (file.type === 'dir') {
			dispatch(pushToStack(currentDir))
			dispatch(setCurrentDir(file._id))
		}
	}

	const DownloadHandler = (e) => {
		e.stopPropagation()
		download(file)
	}

	const DeleteHandler = (e) => {
		e.stopPropagation()
		deleteFile(file)
		dispatch(deleteFileAction(file._id))
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
			<TableCell>
				{file.type === 'dir' ? <FolderIcon /> : <InsertDriveFileIcon />}
			</TableCell>
			<TableCell>{file.name}</TableCell>

			<TableCell align='right'>
				{file.type !== 'dir' ? (
					<Button
						sx={{
							minWidth: 'auto',
							color: 'white',
							':hover': {
								color: 'primary.main',
							},
						}}
						onClick={DownloadHandler}
					>
						<DownloadIcon />
					</Button>
				) : null}
			</TableCell>
			<TableCell>
				<Button
					sx={{
						minWidth: 'auto',
						color: 'white',
						':hover': {
							color: 'primary.main',
						},
					}}
					onClick={DeleteHandler}
				>
					<DeleteIcon />
				</Button>
			</TableCell>
			<TableCell>{dayjs(file.date).format('DD.MM.YYYY HH:mm')}</TableCell>
			<TableCell>{formatFileSize(file.size)}</TableCell>
		</TableRow>
	)
}
