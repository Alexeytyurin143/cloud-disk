import { FileList } from './FileList/FileList'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { CreateDir } from './CreateDir'
import { useDispatch, useSelector } from 'react-redux'
import { popFromStack, setCurrentDir } from '../store/filesSlice'
import { FileInput } from './FileInput'
import { DragAndDrop } from './DragAndDrop'
import { Uploader } from './Uploader/Uploader'
import { Sort } from './Sort'
import { useDebounce } from '../hooks/useDebounce'

export const Main = () => {
	const dispatch = useDispatch()
	const dirStack = useSelector((state) => state.files.dirStack)
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState('')
	const searchDebounce = useDebounce(search, 500)
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
						<Button
							startIcon={<CreateNewFolderIcon />}
							onClick={handleOpen}
						>
							Создать папку
						</Button>
						<FileInput />
						<TextField
							variant='standard'
							label='Поиск'
							sx={{
								margin: '0 auto!important',
								minWidth: '350px',
							}}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
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
