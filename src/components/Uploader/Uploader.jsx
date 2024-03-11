import { Box, Button, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { UploadFile } from './UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import { clearFiles, hideUploader } from '../../store/uploadSlice'
import { useEffect } from 'react'

export const Uploader = () => {
	const files = useSelector((state) => state.upload.files)
	const isVisible = useSelector((state) => state.upload.isVisible)
	const dispatch = useDispatch()

	useEffect(() => {
		if (files.length === 0) {
			dispatch(hideUploader())
		}
	}, [files])

	if (!isVisible) {
		return
	}

	return (
		<Box
			minHeight={150}
			minWidth={450}
			bgcolor='uploader.background'
			bottom={20}
			right={20}
			position='fixed'
			padding={2}
			borderRadius={3}
		>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				marginBottom={1}
			>
				<Typography fontSize={20}>Загрузки</Typography>
				<Button
					sx={{ minWidth: 'auto' }}
					onClick={() => {
						dispatch(hideUploader())
						dispatch(clearFiles())
					}}
				>
					<CloseIcon />
				</Button>
			</Box>

			{files.map((file) => (
				<UploadFile key={file.id} file={file} />
			))}
		</Box>
	)
}
