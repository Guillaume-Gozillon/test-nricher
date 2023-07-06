import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { supabase } from "../hooks/supabaseClient";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, IconButton, LinearProgress } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2b57ce",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProductTable = () => {
  const [product, setProduct] = useState<any>(null);
  const [nbOfProduct, setNbOfProduct] = useState(5);
  const [color, setColor] = useState(null);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState({ value: "PRICE", asc: true });

  const query = supabase
    .from("nricher2")
    .select(
      "ID, REVIEWS_FINAL, BC_MODEL, PRICE, OLD_PRICE, SELLER, ATTRIBUTE_6, ATTRIBUTE_1"
    )
    .limit(nbOfProduct)
    .order(orderBy.value, { ascending: orderBy.asc })
    .not("REVIEWS_FINAL", "is", null)
    .not("BC_MODEL", "is", null)
    .not("OLD_PRICE", "is", null)
    .not("PLATEFORME", "ilike", "%3P%")
    .not("PLATEFORME", "ilike", "%2P%");
  color && query.eq("ATTRIBUTE_6", color);
  type && query.eq("ATTRIBUTE_1", type);

  const fatchData = async () => {
    const { data } = await query;

    setProduct(data);
    if (data) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fatchData();
  }, [nbOfProduct, orderBy, color, type]);

  const handleNbOfProduct = (event: any) => {
    setLoading(true);
    setNbOfProduct(event.target.value);
  };

  const handleColor = (event: any) => {
    setLoading(true);
    setColor(event.target.value);
  };

  const handleType = (event: any) => {
    setLoading(true);
    setType(event.target.value);
  };

  const styledArrow = (type: string) => ({
    borderRadius: "8px",
    transform:
      orderBy.value === type && orderBy.asc === false
        ? "rotate(180deg)"
        : "inherit",
    opacity: orderBy.value !== type ? 0.3 : 1,
    "&:hover": {
      color: "white",
    },
  });

  console.log(color);

  return (
    <>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 200, alignSelf: "right" }}
      >
        <InputLabel id="demo-simple-select-standard-label">
          Nombre de produit
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={nbOfProduct}
          onChange={handleNbOfProduct}
          label="bre-ofproduct"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 200, alignSelf: "right" }}
      >
        <InputLabel id="demo-simple-select-standard-label">Couleur</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={color}
          onChange={handleColor}
          label="color"
        >
          {color && (
            <MenuItem value="">
              <em>Supprimer le filtre</em>
            </MenuItem>
          )}
          <MenuItem value={"Rouge"}>Rouge</MenuItem>
          <MenuItem value={"Bleu"}>Bleu</MenuItem>
          <MenuItem value={"Noir"}>Noir</MenuItem>
          <MenuItem value={"Blanc"}>Blanc</MenuItem>
          <MenuItem value={"Gris"}>Gris</MenuItem>
          <MenuItem value={"Jaune"}>Jaune</MenuItem>
          <MenuItem value={"Beige"}>Beige</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 200, alignSelf: "right" }}
      >
        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={handleType}
          label="type"
        >
          {type && (
            <MenuItem value="">
              <em>Supprimer le filtre</em>
            </MenuItem>
          )}
          <MenuItem value={"Droit"}>Droit</MenuItem>
          <MenuItem value={"Panoramique"}>Panoramique</MenuItem>
          <MenuItem value={"Angle"}>Angle</MenuItem>
          <MenuItem value={"Enfant"}>Enfant</MenuItem>
        </Select>
      </FormControl>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Produit</StyledTableCell>
              <StyledTableCell align="center">
                Prix
                <IconButton
                  size="small"
                  color="inherit"
                  sx={styledArrow("PRICE")}
                  onClick={() => {
                    setLoading(true);
                    setOrderBy({ value: "PRICE", asc: !orderBy.asc });
                  }}
                >
                  <KeyboardArrowDownIcon
                    sx={{ width: "20px", height: "20px" }}
                  />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">
                Plateforme
                <IconButton
                  size="small"
                  color="inherit"
                  sx={styledArrow("PLATEFORME")}
                  onClick={() => {
                    setLoading(true);
                    setOrderBy({ value: "PLATEFORME", asc: !orderBy.asc });
                  }}
                >
                  <KeyboardArrowDownIcon
                    sx={{ width: "20px", height: "20px" }}
                  />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">Couleur</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product &&
              product.map((row: any) => (
                <StyledTableRow key={row.ID}>
                  <StyledTableCell component="th" scope="row">
                    {row.BC_MODEL}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.PRICE}€</StyledTableCell>
                  <StyledTableCell align="center">{row.SELLER}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.ATTRIBUTE_6 ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.ATTRIBUTE_1 ?? "-"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductTable;
