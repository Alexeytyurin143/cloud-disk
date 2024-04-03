import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useForm } from 'react-hook-form'
import { useCreateDirMutation } from '../api/files'
import { useDispatch, useSelector } from 'react-redux'
import { addFile } from '../store/filesSlice'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { Stack } from '@mui/material'

export const CreateDir = ({ open, onClose }) => {
	const style = {
		position: 'absolute',
		top: '30%',
		left: '50%',
		transform: 'translateX(-50%)',
		bgcolor: 'background.default',
		minWidth: 450,
		borderRadius: 4,
		boxShadow: 24,
		p: 4,
	}
	const dispatch = useDispatch()
	const { register, handleSubmit, reset } = useForm()
	const currentDir = useSelector((state) => state.files.currentDir)

	const [createDir] = useCreateDirMutation()

	const onSubmit = async (formData) => {
		try {
			const payload = await createDir({
				dirId: currentDir,
				name: formData.dirname,
			}).unwrap()
			dispatch(addFile(payload))
			reset()
			onClose()
		} catch (error) {
			alert(error.data.message)
		}
	}

	return (
		<Modal open={open} onClose={onClose}>
			<Box component='form' onSubmit={handleSubmit(onSubmit)} sx={style}>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Typography component='h3' variant='h5'>
						Создание папки
					</Typography>
					<Button onClick={onClose} sx={{ minWidth: 'auto' }}>
						<CloseIcon />
					</Button>
				</Stack>

				<TextField
					margin='normal'
					required
					fullWidth
					name='dirname'
					label='Название папки'
					{...register('dirname')}
				/>
				<Button
					type='submit'
					variant='contained'
					sx={{
						mt: 3,
						mb: 2,
					}}
				>
					Создать
				</Button>
			</Box>
		</Modal>
	)
}
