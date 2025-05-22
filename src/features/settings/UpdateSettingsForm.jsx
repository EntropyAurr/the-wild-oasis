import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isPending, settingsData: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {} } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  if (isPending) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    // const field = e.target.name;
    // const value = e.target.value;

    if (!value) return;
    updateSetting({ [field]: value });
    // using bracket notation [] to dynamically set the key name, it means: “Use the value inside this variable as the actual key name"
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" disabled={isUpdating} defaultValue={minBookingLength} onBlur={(e) => handleUpdate(e, "minBookingLength")} />
      </FormRow>
      {/* onBlur: handle situations when the user moves away from an element, either by clicking elsewhere on the page or navigating to another element using the keyboard */}

      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" disabled={isUpdating} defaultValue={maxBookingLength} onBlur={(e) => handleUpdate(e, "maxBookingLength")} />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input type="number" id="max-guests" disabled={isUpdating} defaultValue={maxGuestsPerBooking} onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")} />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input type="number" id="breakfast-price" disabled={isUpdating} defaultValue={breakfastPrice} onBlur={(e) => handleUpdate(e, "breakfastPrice")} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
