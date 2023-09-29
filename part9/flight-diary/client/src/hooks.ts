import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import React, { useState } from 'react';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useField = (type: string) => {
  const [value, setValue] = useState('');

  const onChange = (e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

  const reset = () => setValue('');

  return {
    type,
    value,
    onChange,
    reset
  }
} 
