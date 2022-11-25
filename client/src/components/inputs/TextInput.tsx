import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
   label: string;
   name: string;
   value?: string
   type?: string;
   defaultValue?: any;
}

const TextInput = (props: Props) => {
   const [field, meta] = useField(props.name);

   return (
      <TextField
         margin="normal"
         required
         fullWidth
         autoFocus
         error={meta.touched && !!meta.error}
         helperText={meta.touched && meta.error}
         {...props}
         {...field}
      />
   );
};

export default TextInput;
