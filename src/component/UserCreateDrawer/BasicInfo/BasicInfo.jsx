import React from "react";
import Input from "../../Input/Input";

const BasicInfo = ({ form }) => {
  return (
    <div className="form">
      <Input
        name={"first_name"}
        label={"First Name"}
        form={form}
        placeholder={"Enter first name"}
        required={true}
      ></Input>

      <Input
        name={"last_name"}
        label={"Last Name"}
        form={form}
        placeholder={"Enter last name"}
        required={true}
      ></Input>

      <Input
        name={"email"}
        label={"Email"}
        form={form}
        placeholder={"Enter email address"}
        required={true}
      ></Input>

      <Input
        name={"phone"}
        label={"Phone"}
        form={form}
        placeholder={"(555)-555-5555"}
      ></Input>

      <Input
        label={"Date of Birth"}
        name={"date_of_birth"}
        type={"date"}
        form={form}
        placeholder={"Select date"}
      ></Input>

      <div className="flex flex-col justify-between mb-1 h-full">
        <label htmlFor="active" className="label-inline">
          Is Active
        </label>
        <button
          disabled
          className="bg-blue-500 rounded-full text-white text-sm w-fit y-0.5 pl-2 mb-1.5 flex items-center disabled:bg-[#67A6FF] disabled:cursor-not-allowed"
        >
          <span className="px-1">Active</span>{" "}
          <div className="w-4 h-4 rounded-full bg-white m-1"></div>
        </button>
      </div>

      <p className="bg-[rgb(239,246,255)] text-[#1E40AF] text-sm col-span-2 p-3 rounded-md">
        <strong>Note:</strong> A temporary password will be automatically
        generated for this user. The password will be displayed after user
        creation and should be shared with the user securely.
      </p>
    </div>
  );
};

export default BasicInfo;
