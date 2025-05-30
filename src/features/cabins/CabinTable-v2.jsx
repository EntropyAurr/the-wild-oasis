import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow-v1";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, isPending } = useCabins(); // get the cabin data from Supabase
  const [searchParams] = useSearchParams(); // manage states (read, store, update) through the URL

  if (isPending) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1) FILTER
  // get the data that has been stored in the URL
  const filterValue = searchParams.get("discount") || "all"; // set "all" as default value (in case when we're not in the Cabin page, when navigating between pages)

  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount") filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  // sortBy has the template likes "name-ascending" => using split("-") will return an array of ["name", "ascending"] which field = "name", direction = "ascending"
  const sortBy = searchParams.get("sortBy") || "name-ascending";
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "ascending" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    // Menus context contain 3 actions: duplicate, edit, delete. Only a menu for each table row can only be opened at a time (share the same state) => wrap the entire Table inside the Menus, and for each of CabinRow, we have a Menu child component
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
      </Table>
    </Menus>
  );
}

export default CabinTable;
