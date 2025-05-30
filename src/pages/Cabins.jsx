import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable-v2";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

// CabinTableOperations and CabinTable commnunicate with each other through the URL (seachParams)
// CabinTableOperations: update query's string in the URL
// CabinTable: update the cabin data through filtering/sorting to display on the UI based on the URL that has been updated by the CabinTableOperations

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row type="vertical">
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
