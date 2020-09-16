import { useState } from "react";

function useForm<T>(
  initialState: T
): [T, (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void] {
  const [values, setValues] = useState(initialState);

  return [
    values,
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  ];
}

export default useForm;
