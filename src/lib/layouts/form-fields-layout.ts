import { FormFieldDataSourceEntity, FormFieldType, TBaseFormField, TFormFieldDef } from "@/schemas/forms.schema"
import jumboCenter from "@/assets/layouts/hero-layout/jumbotron-center.svg"

const baseField: TBaseFormField = {
    name: "",
    label: "",
    order: 0,
    required: false,
    placeholder: "",
    validation: undefined,
}

export const formFieldsLayout: {
    field: TFormFieldDef,
    image: any,
    alt: string
}[] = [
        {
            field: {
                type: FormFieldType.Text,
                ...baseField
            },
            alt: "Text",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Email,
                ...baseField
            },
            alt: "Email",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Number,
                ...baseField
            },
            alt: "Number",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Tel,
                ...baseField
            },
            alt: "Tel",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Textarea,
                ...baseField
            },
            alt: "Text Area",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.File,
                accept: "",
                ...baseField,
            },
            alt: "File",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Select,
                options: [],
                ...baseField
            },
            alt: "Select",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Relation,
                dataSource: {
                    entity: FormFieldDataSourceEntity.Job,
                },
                ...baseField
            },
            alt: "Relation",
            image: jumboCenter
        },
    ]