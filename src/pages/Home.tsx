import Navigation from "../components/Navigation";
import ProductTable from "../components/ProductTable";
import TestimonialsBar from "../components/Statistics/TestimonialsBar";
import PriceBar from "../components/Statistics/PriceBar";

import { Divider, Grid, Typography } from "@mui/material";

const Home = () => {
  return (
    <Navigation>
      <h1>Dashboard</h1>
      <Divider sx={{marginBottom:1}} />
      <Typography sx={{ marginBottom: 4 }} variant="h6">
        Produit à l'affiche 🚀
      </Typography>
      <Grid container direction="row" marginBottom={4}>
        <Grid md={6} sm={12} item>
          <PriceBar />
        </Grid>
        <Grid md={6} sm={12} item>
          <TestimonialsBar />
        </Grid>
      </Grid>
      <Divider  sx={{marginBottom:1}} />
      <Typography  sx={{ marginBottom: 4 }} variant="h6">
        Comparateur 📈
      </Typography>
      <ProductTable />
    </Navigation>
  );
};

export default Home;
