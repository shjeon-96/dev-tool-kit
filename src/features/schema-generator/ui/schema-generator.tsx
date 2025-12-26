"use client";

import { Copy, Check, RotateCcw } from "lucide-react";
import { useSchemaGenerator } from "../model/use-schema-generator";
import {
  SCHEMA_TYPES,
  type SchemaType,
  type ArticleSchema,
  type ProductSchema,
  type FAQSchema,
  type HowToSchema,
  type OrganizationSchema,
  type LocalBusinessSchema,
  type PersonSchema,
  type EventSchema,
  type RecipeSchema,
  type BreadcrumbSchema,
} from "../lib/types";
import {
  ArticleForm,
  ProductForm,
  FAQForm,
  HowToForm,
  OrganizationForm,
  LocalBusinessForm,
  PersonForm,
  EventForm,
  RecipeForm,
  BreadcrumbForm,
  type FormProps,
  type HowToFormProps,
  type OrganizationFormProps,
  type PersonFormProps,
  type RecipeFormProps,
} from "./schema-forms";
import { Button, Textarea, Label, Switch } from "@/shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useCopyToClipboard } from "@/shared/lib";

export function SchemaGenerator() {
  const {
    schemaType,
    data,
    output,
    showScriptTag,
    setSchemaType,
    updateField,
    setShowScriptTag,
    reset,
    addFaqItem,
    removeFaqItem,
    updateFaqItem,
    addHowToStep,
    removeHowToStep,
    updateHowToStep,
    addIngredient,
    removeIngredient,
    updateIngredient,
    addInstruction,
    removeInstruction,
    updateInstruction,
    addBreadcrumbItem,
    removeBreadcrumbItem,
    updateBreadcrumbItem,
    addSocialLink,
    removeSocialLink,
    updateSocialLink,
  } = useSchemaGenerator();

  const { copy, copied } = useCopyToClipboard();

  const handleCopy = () => {
    if (output) {
      copy(output);
    }
  };

  const renderForm = () => {
    switch (schemaType) {
      case "Article":
        return (
          <ArticleForm
            data={data as ArticleSchema}
            updateField={updateField as FormProps<ArticleSchema>["updateField"]}
          />
        );
      case "Product":
        return (
          <ProductForm
            data={data as ProductSchema}
            updateField={updateField as FormProps<ProductSchema>["updateField"]}
          />
        );
      case "FAQPage":
        return (
          <FAQForm
            data={data as FAQSchema}
            addItem={addFaqItem}
            removeItem={removeFaqItem}
            updateItem={updateFaqItem}
          />
        );
      case "HowTo":
        return (
          <HowToForm
            data={data as HowToSchema}
            updateField={updateField as HowToFormProps["updateField"]}
            addStep={addHowToStep}
            removeStep={removeHowToStep}
            updateStep={updateHowToStep}
          />
        );
      case "Organization":
        return (
          <OrganizationForm
            data={data as OrganizationSchema}
            updateField={updateField as OrganizationFormProps["updateField"]}
            addSocial={addSocialLink}
            removeSocial={removeSocialLink}
            updateSocial={updateSocialLink}
          />
        );
      case "LocalBusiness":
        return (
          <LocalBusinessForm
            data={data as LocalBusinessSchema}
            updateField={
              updateField as FormProps<LocalBusinessSchema>["updateField"]
            }
          />
        );
      case "Person":
        return (
          <PersonForm
            data={data as PersonSchema}
            updateField={updateField as PersonFormProps["updateField"]}
            addSocial={addSocialLink}
            removeSocial={removeSocialLink}
            updateSocial={updateSocialLink}
          />
        );
      case "Event":
        return (
          <EventForm
            data={data as EventSchema}
            updateField={updateField as FormProps<EventSchema>["updateField"]}
          />
        );
      case "Recipe":
        return (
          <RecipeForm
            data={data as RecipeSchema}
            updateField={updateField as RecipeFormProps["updateField"]}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            updateIngredient={updateIngredient}
            addInstruction={addInstruction}
            removeInstruction={removeInstruction}
            updateInstruction={updateInstruction}
          />
        );
      case "BreadcrumbList":
        return (
          <BreadcrumbForm
            data={data as BreadcrumbSchema}
            addItem={addBreadcrumbItem}
            removeItem={removeBreadcrumbItem}
            updateItem={updateBreadcrumbItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Panel */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Schema Type</Label>
          <Select
            value={schemaType}
            onValueChange={(v) => setSchemaType(v as SchemaType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SCHEMA_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex flex-col">
                    <span>{type.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {type.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg p-4 max-h-[600px] overflow-y-auto">
          {renderForm()}
        </div>

        <Button variant="outline" onClick={reset} className="w-full">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Form
        </Button>
      </div>

      {/* Output Panel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Generated JSON-LD</Label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="script-tag"
                checked={showScriptTag}
                onCheckedChange={setShowScriptTag}
              />
              <Label htmlFor="script-tag" className="text-sm cursor-pointer">
                Include script tag
              </Label>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        <Textarea
          value={output}
          readOnly
          className="min-h-[500px] font-mono text-sm"
          placeholder="Fill in the form to generate JSON-LD..."
        />

        <p className="text-xs text-muted-foreground">
          Add this JSON-LD to your HTML &lt;head&gt; section to enable rich
          results in search engines.
        </p>
      </div>
    </div>
  );
}
