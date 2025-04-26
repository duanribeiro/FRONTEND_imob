import React from "react";
import { Box } from '@mui/material';

export function VideoContainer() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        '@media (max-width: 768px)': {
          height: '30vh',
        },
      }}
    >
      <Box
        component="video"
        src="/assets/video.mp4"
        autoPlay
        loop
        muted
        sx={{
          maxWidth: '100%',
          maxHeight: '100%',
          pointerEvents: 'none',
          '@media (max-width: 768px)': {
            maxWidth: '103%',
            maxHeight: '100%',
          },
        }}
      />
    </Box>
  );
}

