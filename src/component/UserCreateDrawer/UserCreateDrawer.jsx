import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Form, Formik } from "formik";
import userValidationSchema from "../../schema/user/userValidationSchema";
import { userInitialValues } from "../../schema/user/userInitialValues";
import BasicInfo from "./BasicInfo/BasicInfo";
import AddressInfo from "./AddressInfo/AddressInfo";
import { GiCheckMark } from "react-icons/gi";

const UserCreateDrawer = ({ open, onClose }) => {
  const [step, setStep] = useState(1);

  // Disable body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleNext = async (form) => {
    const valid = await form.validateForm();

    if (Object.keys(valid).length === 0) {
      setStep((prev) => prev + 1);
    } else {
      form.setTouched(
        Object.keys(valid).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
    }
  };

  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleSubmit = (values) => {
    console.log("✅ Final Values:", values);
    alert("User created successfully!");
  };

  const navOptions = [
    "Basic Information",
    "Address Information",
    "Roles & Permissions",
    "Client Assignment",
  ];

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Overlay (40% transparent) */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Drawer  (60% width) */}
      <div
        className={`absolute right-0 top-0 h-full bg-[#F5F5F5] w-[63%] shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="">
          <div className="flex items-center gap-2 p-6 bg-white">
            <button onClick={onClose} className="p-0.5 hover:bg-gray-200">
              <RxCross2 ize={21} className="w-6 h-6" />
            </button>{" "}
            <h4
              className="text-[rgb(38,38,38)]
             text-lg font-medium"
            >
              Add User
            </h4>
          </div>

          <div></div>
        </div>

        {/*  */}
        <div className="bg-white m-6 p-6 rounded-md shadow-md min-h- verflow-y-auto">

          <ul className="flex items-center justify-between md:flex-wrap md:gap-4 lg:flex-nowrap">
            {navOptions.map((option, idx) => (
              <li key={idx} className="flex items-center w-full">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center ${
                      idx + 1 < step
                        ? "bg-[#E6F4FF] text-blue-500"
                        : idx + 1 === step
                        ? "bg-blue-500 text-white"
                        : "bg-[#F0F0F0]"
                    } rounded-full text-primary`}
                  >
                    {idx + 1 < step ? <GiCheckMark /> : idx + 1}
                  </div>
                  <h4 className="text-primary font-medium">{option}</h4>
                </div>
                <div
                  className={`h-px flex-1 ${
                    idx + 1 < step ? "bg-blue-500" : "bg-gray-200"
                  } mx-3`}
                ></div>
              </li>
            ))}
          </ul>

          <Formik
            initialValues={userInitialValues}
            validationSchema={userValidationSchema[step]}
            onSubmit={handleSubmit}
            validateOnChange={true}
          >
            {(form) => (
              <Form className="space-y-3 mt-6">
                {step === 1 && <BasicInfo form={form}></BasicInfo>}
                {step === 2 && <AddressInfo form={form}></AddressInfo>}

                <div className="flex items-center justify-between pt-10">
                  <div className="space-x-2.5">
                    <button
                      type="button"
                      disabled={step === 1}
                      onClick={handlePrevious}
                      className="h-9 px-4 border rounded-md bg-black/5 text-sm text-[rgb(89,89,89)] font-medium hover:text-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="h-9 px-4 border rounded-md g-black/5 text-sm text-[rgb(89,89,89)] font-medium hover:text-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm"
                    >
                      Cancel
                    </button>
                  </div>

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={() => handleNext(form)}
                      className="h-9 px-4 border rounded-md bg-[#52C31A] text-sm text-white font-medium hover:bg-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="h-9 px-4 border rounded-md bg-[#52C31A] text-sm text-white font-medium hover:bg-[#1677ff] hover:border-[#1677ff] transition-all duration-200 shadow-sm"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserCreateDrawer;
