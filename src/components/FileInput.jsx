import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
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
		<Button startIcon={<AddIcon />} component='label'>
			Добавить файлы
			<input multiple onChange={onUpload} hidden type='file' />
		</Button>
	)
}
