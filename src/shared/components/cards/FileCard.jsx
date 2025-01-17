import { Delete } from '@mui/icons-material';
import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

export const FileCard = ({
  fileName,
  icon,
  caption,
  isFileUploaded = false,
  onDelete,
  fileNotUploadText = 'File Not Uploaded',
}) => {
  const theme = useTheme();
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap="8px"
      p={1}
      sx={{
        borderRadius: 2,
        backgroundColor: theme.palette.neutral[200],
        // border: 1,
        // borderStyle: isFileUploaded ? 'none' : 'dashed',
      }}
    >
      {icon}
      {isFileUploaded && (
        <Stack flexGrow={1} overflow="hidden">
          <Typography
            variant="subtitle2"
            sx={{
              width: `calc(100% - 10px)`,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            title={fileName}
          >
            {fileName}
          </Typography>
          {caption && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                width: `calc(100% - 10px)`,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
              title={caption}
            >
              {caption}
            </Typography>
          )}
        </Stack>
      )}
      {!isFileUploaded && (
        <Typography variant="caption" color="text.secondary">
          {fileNotUploadText}
        </Typography>
      )}
      {isFileUploaded && onDelete && (
        <IconButton
          sx={{ ml: 'auto' }}
          size="small"
          onClick={onDelete}
          aria-label="Delete"
        >
          <Delete fontSize="small" />
        </IconButton>
      )}
    </Stack>
  );
};

FileCard.propTypes = {
  fileName: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  isFileUploaded: PropTypes.bool,
  onDelete: PropTypes.func,
  caption: PropTypes.string,
  fileNotUploadText: PropTypes.string,
};
