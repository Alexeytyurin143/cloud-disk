import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

export const FileInput = ({ onChange, multiple, children }) => {
	return (
		<Button startIcon={<CloudUploadIcon />} component='label'>
			{children}
			<input multiple={multiple} onChange={onChange} hidden type='file' />
		</Button>
	)
}
