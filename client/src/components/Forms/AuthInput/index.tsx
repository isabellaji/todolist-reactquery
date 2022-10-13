import React from 'react';
import { useForm } from 'react-hook-form';
import { FormList } from './style';

interface RequestType {
  email: string;
  password: string;
  userName?: string;
}

interface AuthFormProps<T extends keyof RequestType> {
  value: T;
  type: string;
  label: string;
  pattern?: RegExp;
  patternMsg?: string;
  minLength?: number;
  minLengthMsg?: string;
  placeholder: string;
  autoFocus?: boolean;
}

export const AuthInput = <T extends keyof RequestType>(props: AuthFormProps<T>) => {
  const {
    value,
    type,
    label,
    pattern,
    patternMsg,
    minLength,
    minLengthMsg,
    placeholder,
    autoFocus,
  } = props;
  const {
    register,
    formState: { errors },
  } = useForm<RequestType>();
  return (
    <FormList>
      <label>{label}</label>
      <input
        {...register(value, {
          required: true,
          pattern: {
            value: pattern || /.*/,
            message: patternMsg || '',
          },
          minLength: {
            value: minLength || 0,
            message: minLengthMsg || '',
          },
        })}
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        autoFocus={autoFocus || false}
      />
      <p className="error__msg">{errors?.email?.message}</p>
    </FormList>
  );
};
