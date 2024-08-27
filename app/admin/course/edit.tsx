import {
  Edit,
  NumberInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" label="Id" validate={[required()]} />
        <TextInput source="title" label="Title" validate={[required()]} />
        <TextInput
          source="imageSrc"
          label="Image Source"
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  );
};
