import { fetchForm } from "@/app/api/forms/[id]/route";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import isEmptyHTML from "@/lib/utilities/isEmptyHTML";
import { cn } from "@/lib/utils";
import { FormBlockDto } from "@/schemas/page.schema";
import { createFormSubmission } from "@/lib/actions/forms.action";

export default async function RenderFormBlock({
  form: { id },
  introContent,
}: FormBlockDto) {
  const form = await fetchForm(id);

  async function handleFormSubmission(formData: FormData) {
    "use server";
    const data: Record<string, unknown> = {};
    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    try {
      await createFormSubmission(id, data);
      // You can add redirect or success handling here
    } catch (error) {
      console.error("Form submission error:", error);
      throw error;
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        {!isEmptyHTML(introContent?.html || "") && (
          <section>
            <RichTextPreview html={introContent?.html || ""} />
          </section>
        )}
      </CardHeader>
      <CardContent>
        <form action={handleFormSubmission} className="space-y-6">
          {form?.fields?.map((field, idx) => (
            <div key={idx} className="space-y-2">
              <Label className="mb-2">
                {field.label}
                {field.required && <span className="text-destructive"> *</span>}
              </Label>

              {/* Field type rendering with proper validation */}
              {field.type === "text" && (
                <Input
                  type="text"
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                  name={field.name}
                  required={field.required}
                  {...field.validation}
                />
              )}

              {field.type === "number" && (
                <Input
                  type="number"
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                  name={field.name}
                  required={field.required}
                  {...field.validation}
                />
              )}

              {field.type === "tel" && (
                <Input
                  type="tel"
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                  name={field.name}
                  required={field.required}
                  {...field.validation}
                />
              )}

           
            

              {field.type === "select" && (
                <Select name={field.name} defaultValue={field.defaultValue}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option, optIdx) => (
                      <SelectItem key={optIdx} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {field.type === "radio" && (
                <RadioGroup name={field.name} defaultValue={field.defaultValue}>
                  {field.options?.map((option, optIdx) => (
                    <div key={optIdx} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.value}
                        id={`${field.name}-${optIdx}`}
                      />
                      <Label htmlFor={`${field.name}-${optIdx}`}>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {field.type === "checkbox" && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    name={field.name}
                    id={field.name}
                    defaultChecked={
                      typeof field.defaultValue === "boolean"
                        ? field.defaultValue
                        : field.defaultValue === "true"
                    }
                  />
                  <Label htmlFor={field.name}>{field.placeholder}</Label>
                </div>
              )}

              {field.type === "email" && (
                <Input
                  type="email"
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                  name={field.name}
                  required={field.required}
                  {...field.validation}
                />
              )}
              {field.type === "textarea" && (
                <Textarea
                className={cn("max-h-24 overflow-y-auto resize-none field-sizing-content whitespace-pre-wrap break-words")}
                  placeholder={field.placeholder}
                  rows={4}
                  defaultValue={field.defaultValue}
                  name={field.name}
                  required={field.required}
                  {...field.validation}
                />
              )}
            </div>
          ))}
          <Button type="submit" className="w-full">
            {"Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

const Label = ({
  children,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) => {
  return (
    <label
      className={cn(
        "block font-medium text-sm text-muted-foreground",
        className
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
