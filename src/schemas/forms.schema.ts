import { z } from "zod";

export enum FormFieldType {
    Text = 'text',
    Email = 'email',
    Tel = 'tel',
    Textarea = 'textarea',
    Number = 'number',
    File = 'file',
    Select = 'select',
    Relation = 'relation'
}

export enum FormFieldDataSourceEntity {
    Blogs = 'blogs',
    Pages = 'pages'
}

// --- FieldValidationPropDto ---
export const FieldValidationPropSchema = z
    .object({
        minLength: z.coerce.number().int({ message: "Must be an integer" }).min(0).optional(),
        maxLength: z.coerce.number().int({ message: "Must be an integer" }).min(0).optional(),
        pattern: z
            .string()
            .optional()
            .refine((val) => {
                if (val === undefined) return true;
                try {
                    new RegExp(val);
                    return true;
                } catch {
                    return false;
                }
            }, { message: "Invalid validation pattern" }),
    })
    .partial();

// --- FormFieldOptionDto ---
export const FormFieldOptionSchema = z.object({
    value: z.string().trim().min(1, { message: "Value is required" }),
    label: z.string().trim().min(1, { message: "Label is required" }),
});

// --- FormFieldDataSourcePropDto ---
export const FormFieldDataSourcePropSchema = z.object({
    entity: z.nativeEnum(FormFieldDataSourceEntity),
    filter: z.string().optional(),
    multiple: z.boolean().optional(),
});

// --- Base props shared by all fields ---
const BaseField = z.object({
    name: z
        .string()
        .trim()
        .min(3, { message: "Name must be between 3 and 50 characters" })
        .max(50, { message: "Name must be between 3 and 50 characters" })
        .regex(/^[A-Za-z0-9]+$/, { message: "No white space, special characters allowed" }),
    label: z
        .string()
        .trim()
        .max(50, { message: "Max 50 characters allowed" }),
    placeholder: z
        .string()
        .trim()
        .max(50, { message: "Max 50 characters allowed" }),
    required: z.boolean().optional(),
    validation: FieldValidationPropSchema.optional(),
    defaultValue: z.string().optional(),
    // order: z
    //     .coerce
    //     .number()
    //     .int({ message: "Order must be an integer" })
    //     .min(0, { message: "Order must be greater than or equal to 0" }),
});

export type TBaseFormField = z.infer<typeof BaseField>;

// --- Simple fields (no extra props) ---
export const TextFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Text),
});
export const EmailFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Email),
});
export const TelFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Tel),
});
export const TextareaFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Textarea),
});
export const NumberFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Number),
});

// --- File field (must have accept) ---
export const FileFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.File),
    accept: z
        .string()
        .trim()
        .min(1, { message: "Accept attribute is required for file fields" }),
});

// --- Select field (must have options; may have multiple) ---
export const SelectFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Select),
    options: z
        .array(FormFieldOptionSchema)
        .min(1, { message: "At least one option is required" }),
    multiple: z.boolean().optional(),
});

// --- Relation field (must have dataSource) ---
export const RelationFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Relation),
    dataSource: FormFieldDataSourcePropSchema,
});

// --- Discriminated union of all field definitions ---
export const FormFieldDefSchema = z.discriminatedUnion("type", [
    TextFieldSchema,
    EmailFieldSchema,
    TelFieldSchema,
    TextareaFieldSchema,
    NumberFieldSchema,
    FileFieldSchema,
    SelectFieldSchema,
    RelationFieldSchema,
]);

export type TFormFieldDef = z.infer<typeof FormFieldDefSchema>;

export const FormDtoSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, { message: "Title must be between 3 and 50 characters" })
        .max(50, { message: "Title must be between 3 and 50 characters" }),
    fields: z
        .array(FormFieldDefSchema)
        .min(1, { message: "At least one field is required" })
        .max(50, { message: "Maximum 50 fields allowed" }),
    submitBtnLabel: z
        .string()
        .trim()
        .max(50, { message: "Submit button label must be between 3 and 50 characters" })
});

export type TFormDto = z.infer<typeof FormDtoSchema>;