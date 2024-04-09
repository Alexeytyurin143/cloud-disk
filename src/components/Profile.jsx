import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteAvatarMutation, useUploadAvatarMutation } from '../api/files'
import { FileInput } from './FileInput'
import { updateUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
	const [uploadAvatar] = useUploadAvatarMutation()
	const [deleteAvatar] = useDeleteAvatarMutation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const currentUser = useSelector((state) => state.user.currentUser)

	const handleUpload = async (event) => {
		if (currentUser.avatar) {
			deleteAvatar()
		}
		const formData = new FormData()
		formData.append('file', event.target.files[0])
		const payload = await uploadAvatar(formData).unwrap()
		dispatch(updateUser(payload))
	}

	const handleDelete = async () => {
		const payload = await deleteAvatar().unwrap()
		dispatch(updateUser(payload))
	}

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				gap: 1,
			}}
		>
			<Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
				На главную
			</Button>
			<Button startIcon={<DeleteIcon />} onClick={handleDelete}>
				Удалить аватар
			</Button>
			<FileInput onChange={handleUpload}>Загрузить аватар</FileInput>
		</Container>
	)
}
