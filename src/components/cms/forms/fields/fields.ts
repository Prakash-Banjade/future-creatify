import { FormFieldType } from "@/schemas/forms.schema"
import { FC } from "react"
import BaseField from "./base-field"
import FileField from "./file-field"
import SelectField from "./select-field"
import RelationField from "./relation-field"

export type FormFieldComponentProps = {
    idx: number,
}

export const fields: Partial<Record<FormFieldType, FC<FormFieldComponentProps>>> = {
    [FormFieldType.Text]: BaseField,
    [FormFieldType.Email]: BaseField,
    [FormFieldType.Number]: BaseField,
    [FormFieldType.Textarea]: BaseField,
    [FormFieldType.Tel]: BaseField,
    [FormFieldType.File]: FileField,
    [FormFieldType.Select]: SelectField,
    [FormFieldType.Relation]: RelationField,
}