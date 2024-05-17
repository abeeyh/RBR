import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  position: Yup.string().required("Cargo é obrigatório"),
  department: Yup.string().required("Departamento é obrigatório"),
  dateOfHire: Yup.date().required("Data de admissão é obrigatória").nullable(),
});

export default validationSchema;