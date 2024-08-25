import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { FormValues, FormErrors, ValidationRule, ValidationRules } from '../api/types';

export const useForm = <T extends FormValues>() => {
    const [values, setValues] = useState<T>({} as T);
    const [errors, setErrors] = useState<FormErrors>({});
    const [rules, setRules] = useState<ValidationRules>({});
    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const handleSubmit = (callback: (values: T) => void) => (event: FormEvent) => {
        event.preventDefault();

        const newErrors: FormErrors = {};
        let firstInvalidKey: keyof T | null = null;

        for (const key in rules) {
            const fieldKey = key as keyof T;
            const rule = rules[fieldKey as string];
            const value = values[fieldKey]?.trim();

            if (rule?.required && !value) {
                newErrors[fieldKey as string] = rule.required;
                if (!firstInvalidKey) {
                    firstInvalidKey = fieldKey;
                }
            }
        }

        setErrors(newErrors);

        if (firstInvalidKey && inputRefs.current[firstInvalidKey as string]) {
            inputRefs.current[firstInvalidKey as string]?.focus();
        }

        if (Object.keys(newErrors).length === 0) {
            callback(values);
        }
    };

    const register = (key: keyof T, options: ValidationRule = {}) => {
        if (!rules[key as string]) {
            setRules(prevRules => ({
                ...prevRules,
                [key as string]: options,
            }));
        }

        return {
            value: values[key] || '',
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                setValues(prevValues => ({
                    ...prevValues,
                    [key]: value,
                }));
            },
            ref: (el: HTMLInputElement | null) => (inputRefs.current[key as string] = el),
        };
    };

    return {
        handleSubmit,
        register,
        errors,
    };
};
