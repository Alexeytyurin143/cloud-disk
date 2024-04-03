import { FileList } from './FileList/FileList'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from 'react'
import { CreateDir } from './CreateDir'
import { useDispatch, useSelector } from 'react-redux'
import { popFromStack, setCurrentDir } from '../store/filesSlice'
import { FileInput } from './FileInput'
import { DragAndDrop } from './DragAndDrop'
import { Uploader } from './Uploader/Uploader'
import { Sort } from './Sort'

export const Main = () => {
	const dispatch = useDispatch()
	const dirStack = useSelector((state) => state.files.dirStack)
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleBack = () => {
		if (dirStack.length > 0) {
			const backDirId = dirStack.at(-1)
			dispatch(setCurrentDir(backDirId))
			dispatch(popFromStack())
		}
	}
	return (
		<>
			<DragAndDrop>
				<Container sx={{ my: 2 }}>
					<Stack
						direction='row'
						alignItems='center'
						spacing={1}
						mb={1}
					>
						<Button
							startIcon={<ArrowBackIcon />}
							onClick={handleBack}
							disabled={dirStack.length === 0}
						>
							Назад
						</Button>
						<Button startIcon={<AddIcon />} onClick={handleOpen}>
							Создать папку
						</Button>
						<FileInput />
						<Sort />
					</Stack>
					<FileList />
				</Container>
			</DragAndDrop>
			<CreateDir open={open} onClose={handleClose} />
			<Uploader></Uploader>
		</>
	)
}
