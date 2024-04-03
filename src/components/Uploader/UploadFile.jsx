import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteUploadFile } from '../../store/uploadSlice'

export const UploadFile = ({ file }) => {
	const dispatch = useDispatch()

	return (
		<Box
			display='flex'
			justifyContent='space-between'
			alignItems='center'
			marginBottom={1}
			bgcolor='uploader.file'
			padding={1}
			borderRadius={2}
		>
			<Box display='flex' alignItems='center' gap={1}>
				<Button
					sx={{ minWidth: 'auto', padding: 0 }}
					onClick={() => dispatch(deleteUploadFile(file.id))}
				>
					<CloseIcon />
				</Button>
				<Typography marginRight={2} maxWidth={500}>
					{file.name}
				</Typography>
			</Box>

			<CircularProgress variant='determinate' value={file.progress} />
		</Box>
	)
}
