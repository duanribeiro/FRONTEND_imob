import { Box, Typography } from "@mui/material";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <Box sx={{ maxWidth: "1200px", margin: "0 auto", paddingX: 2 }}>
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 4,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default Section;
