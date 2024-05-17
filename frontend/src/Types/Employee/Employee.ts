import { Key } from "react";

type Employee = {
  _id: Key | null | undefined;
  name: string;
  position: string;
  department: string;
  dateOfHire: string;
};

export default Employee;