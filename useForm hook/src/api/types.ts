export interface FormValues {
    name?: string;
    age?: string;
    [key: string]: string | undefined;
}

export interface FormErrors {
    name?: string;
    age?: string;
    [key: string]: string | undefined;
}

export interface ValidationRule {
    required?: string;
}

export interface ValidationRules {
    [key: string]: ValidationRule;
}