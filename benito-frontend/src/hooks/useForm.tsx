import { useState } from "react";

function useForm<T>(
  initialState: T
): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [values, setValues] = useState(initialState);

  return [
    values,
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e);
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  ];
}

export default useForm;
