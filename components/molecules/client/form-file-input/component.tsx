'use client';


import React, { useState, useRef } from 'react';
import { FileInput } from '@/components/atoms/file-input';
import { cn } from '@/lib/cn';

interface FormFileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const FormFileInput: React.FC<FormFileInputProps> = ({ label = 'File', className, ...props }) => {
  return (
    <div className="flex flex-col w-full max-w-md">
      <label className={cn("mb-2 text-sm font-medium text-gray-700")}>{label}</label>
      <FileInput/>
    </div>
  );
};
export default FormFileInput;