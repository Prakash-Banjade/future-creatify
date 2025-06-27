import React, { ButtonHTMLAttributes, createContext, InputHTMLAttributes, PropsWithChildren } from 'react';
import { FieldValues, useFormContext, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea"
import { AppCheckbox } from './app-form-checkbox';
import { AppFormSelect } from './select';
import { AppFormPhone } from './app-form-phone';
import { AppFormText } from './app-form-text';
import { AppFormEmail } from './app-form-email';
import { format } from 'date-fns';
import { NUMBER_REGEX_STRING } from '@/CONSTANTS';


type SchemaContextType<T> = ZodType<T>;

const SchemaContext = createContext<SchemaContextType<unknown> | null>(null);

export type TFormFieldProps<T> = {
    name: keyof T;
    label?: string;
    placeholder?: string;
    description?: string;
    required?: boolean;
    inputClassName?: string;
    containerClassName?: string;
};

interface FormProps<T extends FieldValues> {
    schema: ZodType<T>;
    children: React.ReactNode;
    form: UseFormReturn<T>;
}

function AppForm<T extends FieldValues>({ schema, children, form }: FormProps<T>) {
    return (
        <SchemaContext.Provider value={schema}>
            <Form {...form}>{children}</Form>
        </SchemaContext.Provider>
    );
}

export interface AppFormInputProps<T> extends TFormFieldProps<T>, Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> { }

AppForm.Text = AppFormText;

AppForm.Email = AppFormEmail;

AppForm.Password = function Password<T extends FieldValues>({
    name,
    label,
    placeholder = '',
    description = '',
    required = false,
    inputClassName = '',
    containerClassName = '',
    ...props
}: AppFormInputProps<T>) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name as string}
            render={({ field }) => (
                <FormItem className={containerClassName}>
                    <FormLabel>
                        {label}
                        {required && <span className="text-destructive">*</span>}
                    </FormLabel>
                    <FormControl>
                        <Input type="password" className={inputClassName} placeholder={placeholder} {...field} required={required} {...props} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

interface AppFormActionProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
    action?: () => void;
}

AppForm.Submit = function Submit({ children, action, disabled, ...props }: AppFormActionProps) {
    const form = useFormContext();

    // we can pass disabled prop from outside and it will also be disabled when form is submitting
    const isDisabled = form.formState.isSubmitting || form.formState.isLoading || disabled;

    return (
        <FormItem>
            <FormControl>
                <Button type="submit" {...props} disabled={isDisabled} onClick={() => action?.()}>
                    {
                        form.formState.isSubmitting
                            ? <LoaderCircle className="h-4 w-4 animate-spin" />
                            : children
                    }
                </Button>
            </FormControl>
        </FormItem>
    );
};

AppForm.Cancel = function Cancel({ children, action, ...props }: AppFormActionProps) {
    const form = useFormContext();

    const disabled = form.formState.isSubmitting || form.formState.isLoading;

    return (
        <FormItem>
            <FormControl>
                <Button variant={'outline'} type="reset" {...props} disabled={disabled} onClick={() => {
                    form.reset(form.formState.defaultValues);
                    action?.();
                }}>
                    {children}
                </Button>
            </FormControl>
        </FormItem>
    );
};


AppForm.DatePicker = function DatePicker<T extends FieldValues>({ name, label, placeholder = '', description = '', required = false, inputClassName = '', containerClassName = '', ...props }: AppFormInputProps<T>) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name as string}
            render={({ field }) => (
                <FormItem className={containerClassName}>
                    <FormLabel>
                        {label}
                        {required && <span className="text-destructive">*</span>}
                    </FormLabel>
                    <FormControl>
                        <Input
                            type="date"
                            className={inputClassName}
                            placeholder={placeholder}
                            {...field}
                            value={!!field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''}
                            required={required}
                            onChange={e => {
                                const val = e.target.value;

                                if (val) {
                                    // field.onChange(val + ISO_TIME);
                                    field.onChange(val);
                                } else {
                                    field.onChange('');
                                }
                            }}
                            {...props}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

AppForm.TimePicker = function TimePicker<T extends FieldValues>({
    name,
    label,
    placeholder = '',
    description = '',
    required = false,
    inputClassName = '',
    containerClassName = '',
    ...props
}: AppFormInputProps<T>) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name as string}
            render={({ field }) => (
                <FormItem className={containerClassName}>
                    <FormLabel>
                        {label}
                        {required && <span className="text-destructive">*</span>}
                    </FormLabel>
                    <FormControl>
                        <Input type="time" className={inputClassName} placeholder={placeholder} {...field} required={required} {...props} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

AppForm.Textarea = function AppFormTextarea<T extends FieldValues>({ name, label, placeholder = '', description = '', required = false, inputClassName = '', containerClassName = '', rows = 2 }: TFormFieldProps<T> & { rows?: number }) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name as string}
            render={({ field }) => (
                <FormItem className={containerClassName}>
                    <FormLabel>
                        {label}
                        {required && <span className="text-destructive">*</span>}
                    </FormLabel>
                    <FormControl>
                        <Textarea rows={rows} className={inputClassName} placeholder={placeholder} {...field} required={required} value={field.value ?? ''} onChange={field.onChange} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

AppForm.Number = function Number<T extends FieldValues>({
    name,
    label,
    placeholder = '',
    description = '',
    required = false,
    inputClassName = '',
    containerClassName = '',
    ...props
}: AppFormInputProps<T>) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name as string}
            render={({ field }) => (
                <FormItem className={containerClassName}>
                    {
                        !!label && <FormLabel>
                            {label}
                            {required && <span className="text-destructive">*</span>}
                        </FormLabel>
                    }
                    <FormControl>
                        <Input
                            type="number"
                            pattern={NUMBER_REGEX_STRING}
                            className={inputClassName}
                            placeholder={placeholder}
                            {...field}
                            {...props}
                            required={required}
                            value={field.value ?? ''}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

AppForm.Phone = AppFormPhone;

AppForm.Checkbox = AppCheckbox;

AppForm.Select = AppFormSelect;

// AppForm.DynamicSelect = DynamicSelect;

// AppForm.DynamicSelect_V2 = DynamicSelect_V2;

// AppForm.MultiSelect = MultiSelect;


// AppForm.DynamicCombobox = DynamicCombobox;

// AppForm.RadioGroup = AppFormRadioGroup;
export default AppForm;