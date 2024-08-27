import { Create, required, SimpleForm, TextInput } from "react-admin";

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" label="title" validate={[required()]} />
        <TextInput
          source="imageSrc"
          label="Image Source"
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};
