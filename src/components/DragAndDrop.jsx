import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { addFile } from '../store/filesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { upload } from '../api/files'

export const DragAndDrop = ({ children }) => {
	const [highlight, setHighlight] = useState(false)
	const currentDir = useSelector((state) => state.files.currentDir)
	const dispatch = useDispatch()

	const handleDragOver = (e) => {
		e.preventDefault()
		setHighlight(true)
	}

	const handleDragLeave = () => {
		setHighlight(false)
	}

	const handleDrop = (e) => {
		e.preventDefault()
		setHighlight(false)

		const files = [...e.dataTransfer.files]
		if (files) {
			files.forEach(async (file) => {
				try {
					const response = await upload({ file, currentDir })
					dispatch(addFile(response))
				} catch (error) {
					console.error('Ошибка загрузки:', error)
				}
			})
		}
	}

	return (
		<Box
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			sx={{
				border: highlight && '5px dashed',
				borderColor: highlight && 'primary.main',
				margin: highlight && '20px',
				display: highlight && 'flex',
				justifyContent: highlight && 'center',
				alignItems: highlight && 'center',
				minHeight: highlight
					? 'calc(100vh - 121px)'
					: 'calc(100vh - 81px)',
			}}
		>
			{highlight ? (
				<Typography color='primary.main' fontSize='330px'>
					+
				</Typography>
			) : (
				<>{children}</>
			)}
		</Box>
	)
}
