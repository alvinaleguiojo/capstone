import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import styles from "../styles/CustomGrid.module.css";

const CustomGrid = ({ thead1, thead2, thead3, thead4, thead5 }) => {
  return (
    <Table className={styles.table}>
      <Thead className={styles.thead}>
        <Tr>
          <Th>{thead1}</Th>
          <Th>{thead2}</Th>
          <Th>{thead3}</Th>
          <Th>{thead4}</Th>
          <Th>{thead5}</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Tablescon</Td>
          <Td>9 April 2019</Td>
          <Td>East Annex</Td>
          <Td>Super Friends</Td>
          <Td>Data Tables</Td>
        </Tr>
    
      </Tbody>
    </Table>
  );
};

export default CustomGrid;
