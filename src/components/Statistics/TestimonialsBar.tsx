import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { barOptions } from "../../utils/barOptions";
import { supabase } from "../../hooks/supabaseClient";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { truncate } from "lodash";
import { Box, CircularProgress } from "@mui/material";

const TestimonialsBar = () => {
  const [dataProduct, setDataProduct] = useState<any>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [model, setModel] = useState<any>(null);
  const [nbOfProduct, setNbOfProduct] = useState<number>(5);

  const fatchData = async () => {
    const { data: products } = await supabase
      .from("nricher2")
      .select("BC_MODEL, PRICE")
      .limit(nbOfProduct)
      .order("PRICE", { ascending: false })
      .not("PRICE", "is", null)
      .not("BC_MODEL", "is", null)
      .not("PLATEFORME", "ilike", "%3P%")
      .not("PLATEFORME", "ilike", "%2P%");

    setDataProduct(products);
    data && setLoading(false);
  };

  useEffect(() => {
    fatchData();
  }, [nbOfProduct]);

  useEffect(() => {
    if (dataProduct) {
      const prices = dataProduct.map((item: any) => item.PRICE);
      setPrice(prices);

      const dataModel = dataProduct.map((item: any) =>
        truncate(item.BC_MODEL, {
          length: 25,
        })
      );

      setModel(dataModel);
    }
  }, [dataProduct]);

  const data = {
    labels: model,
    datasets: [
      {
        label: " Demande ",
        data: price,
        borderColor: "#59efbd",
        backgroundColor: "#59efbd",
      },
    ],
  };

  const handleChange = (event: any) => {
    setNbOfProduct(event.target.value);
    setLoading(true);
  };

  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Box
          sx={{ m: 1, minWidth: 200, display: "flex", flexDirection: "row" }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Nombre de produit
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={nbOfProduct}
            sx={{ width: 200 }}
            label="nbOfProduct"
            onChange={handleChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
          {loading && (
            <Box sx={{ alignSelf: "center", ml: 3 }}>
              <CircularProgress size={20} />
            </Box>
          )}
        </Box>
      </FormControl>
      <Bar options={barOptions("Les prix les plus compétitifs")} data={data} />
    </>
  );
};

export default TestimonialsBar;
