import { FileList } from './FileList/FileList'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from 'react'
import { CreateDir } from './CreateDir'
import { useDispatch, useSelector } from 'react-redux'
import { popFromStack, setCurrentDir } from '../store/filesSlice'
import { FileInput } from './FileInput'
import { DragAndDrop } from './DragAndDrop'
import { Uploader } from './Uploader/Uploader'
import { Sort } from './Sort'
import { SearchInput } from './SearchInput'
import { upload, useLazySearchFilesQuery } from '../api/files'
import { Box, CircularProgress } from '@mui/material'

export const Main = () => {
	const dispatch = useDispatch()
	const dirStack = useSelector((state) => state.files.dirStack)
	const [searchFiles, { isFetching }] = useLazySearchFilesQuery()
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const currentDir = useSelector((state) => state.files.currentDir)

	const onUpload = (event) => {
		const files = [...event.target.files]

		files.forEach((file) => dispatch(upload(file, currentDir)))
	}

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
				<Container>
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
						<FileInput onChange={onUpload} multiple>
							Загрузить файлы
						</FileInput>
						<SearchInput searchFiles={searchFiles} />
						<Sort />
					</Stack>
					{isFetching && (
						<Box
							display='flex'
							alignItems='center'
							justifyContent='center'
						>
							<CircularProgress size={120} />
						</Box>
					)}
					<Box display={isFetching && 'none'}>
						<FileList />
					</Box>
				</Container>
			</DragAndDrop>
			<CreateDir open={open} onClose={handleClose} />
			<Uploader></Uploader>
		</>
	)
}
