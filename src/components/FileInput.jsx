import Button from '@mui/material/Button'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { useDispatch, useSelector } from 'react-redux'
import { addFile } from '../store/filesSlice'
import { upload } from '../api/files'

export const FileInput = () => {
	const dispatch = useDispatch()
	const currentDir = useSelector((state) => state.files.currentDir)

	const onUpload = (event) => {
		const files = [...event.target.files]

		files.forEach((file) => dispatch(upload(file, currentDir)))
	}

	return (
		<Button
			startIcon={<AttachFileIcon />}
			variant='outlined'
			component='label'
			size='large'
		>
			Выберите или перетащите файлы для загрузки
			<input multiple onChange={onUpload} hidden type='file' />
		</Button>
	)
}
