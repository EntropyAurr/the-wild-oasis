import Button from "../../ui/Button";
import Modal from "../../ui/Modal-v1";
import CabinTable from "./CabinTable-v1";
import CreateCabinForm from "./CreateCabinForm-v1";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button variation="primary" size="medium">
          Add new Cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens="table">
        <Button variation="primary" size="medium">
          Show table
        </Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

/* function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)} variation="primary" size="medium">
        Add new cabin
      </Button>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}
 */
export default AddCabin;
