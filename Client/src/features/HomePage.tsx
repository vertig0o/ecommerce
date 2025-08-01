import { Box, Button, Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <>
      {/* Hero Bölümü */}
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "white",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Yeni Nesil Akıllı Saatler
        </Typography>
        <Typography variant="h6" maxWidth={600}>
          Teknolojiyi bileğinizde taşımanın en şık ve fonksiyonel yolu.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 4, px: 5, borderRadius: 4 }}
        >
          Ürünleri İncele
        </Button>
      </Box>

      {/* Hakkımızda Bölümü */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Neden Biz?
        </Typography>
        <Typography variant="body1" maxWidth={700} mx="auto" textAlign="center">
          Yılların deneyimiyle, kaliteli ve uygun fiyatlı akıllı saatler
          sunuyoruz. Müşteri memnuniyeti bizim için en önemli önceliktir.
        </Typography>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "#222", color: "white", py: 3, textAlign: "center" }}>
        <Typography variant="body2">
          &copy; 2025 SaatDükkanım. Tüm hakları saklıdır.
        </Typography>
      </Box>
    </>
  );
}
