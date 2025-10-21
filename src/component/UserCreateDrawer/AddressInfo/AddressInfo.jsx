import { usStates } from "../../../data/state";
import Input from "../../Input/Input";

const AddressInfo = ({ form }) => {
  return (
    <div className="form">
      <Input
        form={form}
        label={"Address Line 1"}
        name={"address_line_1"}
        placeholder={"Enter address line 1"}
      ></Input>

      <Input
        form={form}
        label={"Address Line 2"}
        name={"address_line_2"}
        placeholder={"Enter address line 2"}
      ></Input>

      <Input
        form={form}
        label={"City"}
        name={"city"}
        placeholder={"Enter City"}
      ></Input>

      <div className="flex flex-col gap-2">
        <label htmlFor="state" className="label-inline">
          State/Province
        </label>
        <select name="province" defaultValue="" className="p-0 text-sm">
          <option value="" disabled>
            Select state/province
          </option>
          {usStates?.map((province, idx) => (
            <option
              className="text-sm text-primary"
              key={idx}
              value={province.name}
            >
              {province.name} ({province.code})
            </option>
          ))}
        </select>
      </div>

      <Input
        form={form}
        label={"Postal Code"}
        name={"postal_code"}
        placeholder={"Enter postal code (e.g., 12345, K1A 0B1)"}
      ></Input>
    </div>
  );
};

export default AddressInfo;
