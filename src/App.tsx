import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
import { Container, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
    },
    palette: {
      primary: {
        main: "#2b57ce",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ marginBottom: 20 }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
