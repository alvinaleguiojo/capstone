import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Barcode from "react-barcode";
import { Button } from "@mui/material";

const products = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productID, setProductID] = useState("");

  const generateBarcode = () => {
    setProducts([...products, { productID, productName }]);
  };

  return (
    <Box>
      <Typography variant="h5" component="h5" color="#B82623">
        Medice Name
      </Typography>
      <input
        type="text"
        placeholder="Medicine Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <Typography variant="h5" component="h5" color="#B82623">
        Medice ID
      </Typography>
      <input
        type="text"
        placeholder="Medicine ID"
        value={productID}
        onChange={(e) => setProductID(e.target.value)}
      />

      <Button onClick={() => generateBarcode()}>
        Generate Medicine Barcode
      </Button>

      <Box>
        Barcode here
        {products.map((product, key) => {
          return <Barcode value={product.productID} key={key} />;
        })}
      </Box>
    </Box>
  );
};

export default products;
