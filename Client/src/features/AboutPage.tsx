import { Box, Container, Typography, Paper } from "@mui/material";

export default function AboutSection() {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom align="center">
          Hakkımızda
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            SaatDükkanım, teknoloji ve şıklığı bileğinizde buluşturmayı
            hedefleyen, kaliteli ve uygun fiyatlı akıllı saatler sunan bir
            platformdur. Müşteri memnuniyetini en ön planda tutuyor, her
            kullanıcıya özel çözümler geliştirmeyi amaçlıyoruz.
          </Typography>
          <Typography variant="body1" paragraph>
            Kurucumuz Atılay Yörük, sektörde uzun yıllara dayanan deneyimi ile,
            teknoloji tutkusunu sizinle paylaşmayı sürdürüyor. Siz de
            bileğinizde teknolojiyle buluşmak istiyorsanız doğru yerdesiniz!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
