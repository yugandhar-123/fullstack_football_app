


import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function MyMessage({ messageText, messageColor }) {
  //                                              ^^^^^^^^^^^ now matches camelCase
  if (!messageText) return null; // guard: render nothing when not needed

  return (
    <Box sx={{
      width: '100%',
      height: '40px',
      color: 'white',
      marginBottom: '20px',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: messageColor, // now receives the value correctly
    }}>
      <Typography>{messageText}</Typography>
    </Box>
  );
}
