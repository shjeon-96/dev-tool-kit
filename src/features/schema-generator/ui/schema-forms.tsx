"use client";

/**
 * Schema Form Components
 *
 * 각 스키마 타입별 폼 컴포넌트
 */

import { Plus, Trash2 } from "lucide-react";
import { Button, Input, Label, Textarea } from "@/shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import type {
  ArticleSchema,
  ProductSchema,
  FAQSchema,
  HowToSchema,
  OrganizationSchema,
  LocalBusinessSchema,
  PersonSchema,
  EventSchema,
  RecipeSchema,
  BreadcrumbSchema,
} from "../lib/types";

// ============================================
// Shared Components
// ============================================

export function FormField({
  label,
  children,
  description,
}: {
  label: string;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export interface FormProps<T> {
  data: T;
  updateField: <K extends keyof T>(field: K, value: T[K]) => void;
}

// ============================================
// Article Form
// ============================================

export function ArticleForm({ data, updateField }: FormProps<ArticleSchema>) {
  return (
    <div className="space-y-4">
      <FormField label="Headline *">
        <Input
          value={data.headline}
          onChange={(e) => updateField("headline", e.target.value)}
          placeholder="Article title"
        />
      </FormField>
      <FormField label="Description">
        <Textarea
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Article summary"
          rows={3}
        />
      </FormField>
      <FormField label="Image URL">
        <Input
          value={data.image}
          onChange={(e) => updateField("image", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Date Published">
          <Input
            type="date"
            value={data.datePublished}
            onChange={(e) => updateField("datePublished", e.target.value)}
          />
        </FormField>
        <FormField label="Date Modified">
          <Input
            type="date"
            value={data.dateModified}
            onChange={(e) => updateField("dateModified", e.target.value)}
          />
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Author Name *">
          <Input
            value={data.authorName}
            onChange={(e) => updateField("authorName", e.target.value)}
            placeholder="John Doe"
          />
        </FormField>
        <FormField label="Author URL">
          <Input
            value={data.authorUrl}
            onChange={(e) => updateField("authorUrl", e.target.value)}
            placeholder="https://example.com/author"
          />
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Publisher Name *">
          <Input
            value={data.publisherName}
            onChange={(e) => updateField("publisherName", e.target.value)}
            placeholder="Example Inc."
          />
        </FormField>
        <FormField label="Publisher Logo URL">
          <Input
            value={data.publisherLogo}
            onChange={(e) => updateField("publisherLogo", e.target.value)}
            placeholder="https://example.com/logo.png"
          />
        </FormField>
      </div>
    </div>
  );
}

// ============================================
// Product Form
// ============================================

export function ProductForm({ data, updateField }: FormProps<ProductSchema>) {
  return (
    <div className="space-y-4">
      <FormField label="Product Name *">
        <Input
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Product name"
        />
      </FormField>
      <FormField label="Description">
        <Textarea
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Product description"
          rows={3}
        />
      </FormField>
      <FormField label="Image URL">
        <Input
          value={data.image}
          onChange={(e) => updateField("image", e.target.value)}
          placeholder="https://example.com/product.jpg"
        />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Brand">
          <Input
            value={data.brand}
            onChange={(e) => updateField("brand", e.target.value)}
            placeholder="Brand name"
          />
        </FormField>
        <FormField label="SKU">
          <Input
            value={data.sku}
            onChange={(e) => updateField("sku", e.target.value)}
            placeholder="SKU-12345"
          />
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Price *">
          <Input
            value={data.price}
            onChange={(e) => updateField("price", e.target.value)}
            placeholder="99.99"
          />
        </FormField>
        <FormField label="Currency">
          <Input
            value={data.priceCurrency}
            onChange={(e) => updateField("priceCurrency", e.target.value)}
            placeholder="USD"
          />
        </FormField>
        <FormField label="Availability">
          <Select
            value={data.availability}
            onValueChange={(v) =>
              updateField("availability", v as ProductSchema["availability"])
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="InStock">In Stock</SelectItem>
              <SelectItem value="OutOfStock">Out of Stock</SelectItem>
              <SelectItem value="PreOrder">Pre-Order</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Rating (1-5)">
          <Input
            value={data.ratingValue}
            onChange={(e) => updateField("ratingValue", e.target.value)}
            placeholder="4.5"
          />
        </FormField>
        <FormField label="Review Count">
          <Input
            value={data.reviewCount}
            onChange={(e) => updateField("reviewCount", e.target.value)}
            placeholder="120"
          />
        </FormField>
      </div>
    </div>
  );
}

// ============================================
// FAQ Form
// ============================================

export interface FAQFormProps {
  data: FAQSchema;
  addItem: () => void;
  removeItem: (index: number) => void;
  updateItem: (
    index: number,
    field: "question" | "answer",
    value: string,
  ) => void;
}

export function FAQForm({
  data,
  addItem,
  removeItem,
  updateItem,
}: FAQFormProps) {
  return (
    <div className="space-y-4">
      {data.items.map((item, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Question {index + 1}</span>
            {data.items.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Input
            value={item.question}
            onChange={(e) => updateItem(index, "question", e.target.value)}
            placeholder="Enter question"
          />
          <Textarea
            value={item.answer}
            onChange={(e) => updateItem(index, "answer", e.target.value)}
            placeholder="Enter answer"
            rows={2}
          />
        </div>
      ))}
      <Button variant="outline" onClick={addItem} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Question
      </Button>
    </div>
  );
}

// ============================================
// HowTo Form
// ============================================

export interface HowToFormProps {
  data: HowToSchema;
  updateField: <K extends keyof HowToSchema>(
    field: K,
    value: HowToSchema[K],
  ) => void;
  addStep: () => void;
  removeStep: (index: number) => void;
  updateStep: (
    index: number,
    field: "name" | "text" | "image",
    value: string,
  ) => void;
}

export function HowToForm({
  data,
  updateField,
  addStep,
  removeStep,
  updateStep,
}: HowToFormProps) {
  return (
    <div className="space-y-4">
      <FormField label="Title *">
        <Input
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="How to..."
        />
      </FormField>
      <FormField label="Description">
        <Textarea
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Brief description"
          rows={2}
        />
      </FormField>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Total Time" description="ISO 8601 (e.g., PT30M)">
          <Input
            value={data.totalTime}
            onChange={(e) => updateField("totalTime", e.target.value)}
            placeholder="PT30M"
          />
        </FormField>
        <FormField label="Estimated Cost">
          <Input
            value={data.estimatedCost}
            onChange={(e) => updateField("estimatedCost", e.target.value)}
            placeholder="50"
          />
        </FormField>
        <FormField label="Currency">
          <Input
            value={data.currency}
            onChange={(e) => updateField("currency", e.target.value)}
            placeholder="USD"
          />
        </FormField>
      </div>

      <div className="space-y-3">
        <Label>Steps</Label>
        {data.steps.map((step, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Step {index + 1}</span>
              {data.steps.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeStep(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Input
              value={step.name}
              onChange={(e) => updateStep(index, "name", e.target.value)}
              placeholder="Step name"
            />
            <Textarea
              value={step.text}
              onChange={(e) => updateStep(index, "text", e.target.value)}
              placeholder="Step instructions"
              rows={2}
            />
            <Input
              value={step.image || ""}
              onChange={(e) => updateStep(index, "image", e.target.value)}
              placeholder="Step image URL (optional)"
            />
          </div>
        ))}
        <Button variant="outline" onClick={addStep} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Step
        </Button>
      </div>
    </div>
  );
}

// ============================================
// Organization Form
// ============================================

export interface OrganizationFormProps {
  data: OrganizationSchema;
  updateField: <K extends keyof OrganizationSchema>(
    field: K,
    value: OrganizationSchema[K],
  ) => void;
  addSocial: () => void;
  removeSocial: (index: number) => void;
  updateSocial: (index: number, value: string) => void;
}

export function OrganizationForm({
  data,
  updateField,
  addSocial,
  removeSocial,
  updateSocial,
}: OrganizationFormProps) {
  return (
    <div className="space-y-4">
      <FormField label="Organization Name *">
        <Input
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Company name"
        />
      </FormField>
      <FormField label="Website URL">
        <Input
          value={data.url}
          onChange={(e) => updateField("url", e.target.value)}
          placeholder="https://example.com"
        />
      </FormField>
      <FormField label="Logo URL">
        <Input
          value={data.logo}
          onChange={(e) => updateField("logo", e.target.value)}
          placeholder="https://example.com/logo.png"
        />
      </FormField>
      <FormField label="Description">
        <Textarea
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Organization description"
          rows={2}
        />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Email">
          <Input
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="contact@example.com"
          />
        </FormField>
        <FormField label="Phone">
          <Input
            value={data.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+1-555-555-5555"
          />
        </FormField>
      </div>

      <div className="space-y-3">
        <Label>Social Profiles</Label>
        {data.sameAs.map((url, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => updateSocial(index, e.target.value)}
              placeholder="https://twitter.com/..."
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSocial(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addSocial} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Social Profile
        </Button>
      </div>
    </div>
  );
}

// ============================================
// LocalBusiness Form
// ============================================

export function LocalBusinessForm({
  data,
  updateField,
}: FormProps<LocalBusinessSchema>) {
  return (
    <div className="space-y-4">
      <FormField label="Business Name *">
        <Input
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Business name"
        />
      </FormField>
      <FormField label="Description">
        <Textarea
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Business description"
          rows={2}
        />
      </FormField>
      <FormField label="Website URL">
        <Input
          value={data.url}
          onChange={(e) => updateField("url", e.target.value)}
          placeholder="https://example.com"
        />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Phone">
          <Input
            value={data.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+1-555-555-5555"
          />
        </FormField>
        <FormField label="Email">
          <Input
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="contact@example.com"
          />
        </FormField>
      </div>
      <FormField label="Street Address *">
        <Input
          value={data.streetAddress}
          onChange={(e) => updateField("streetAddress", e.target.value)}
          placeholder="123 Main St"
        />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="City *">
          <Input
            value={data.addressLocality}
            onChange={(e) => updateField("addressLocality", e.target.value)}
            placeholder="New York"
          />
        </FormField>
        <FormField label="State/Region">
          <Input
            value={data.addressRegion}
            onChange={(e) => updateField("addressRegion", e.target.value)}
            placeholder="NY"
          />
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Postal Code *">
          <Input
            value={data.postalCode}
            onChange={(e) => updateField("postalCode", e.target.value)}
            placeholder="10001"
          />
        </FormField>
        <FormField label="Country *">
          <Input
            value={data.addressCountry}
            onChange={(e) => updateField("addressCountry", e.target.value)}
            placeholder="US"
          />
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Latitude">
          <Input
            value={data.latitude}
            onChange={(e) => updateField("latitude", e.target.value)}
            placeholder="40.7128"
          />
        </FormField>
        <FormField label="Longitude">
          <Input
            value={data.longitude}
            onChange={(e) => updateField("longitude", e.target.value)}
            placeholder="-74.0060"
          />
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Price Range">
          <Input
            value={data.priceRange}
            onChange={(e) => updateField("priceRange", e.target.value)}
            placeholder="$$"
          />
        </FormField>
        <FormField label="Opening Hours" description="e.g., Mo-Fr 09:00-17:00">
          <Input
            value={data.openingHours}
            onChange={(e) => updateField("openingHours", e.target.value)}
            placeholder="Mo-Fr 09:00-17:00"
          />
        </FormField>
      </div>
    </div>
  );
}

// ============================================
// Person Form
// ============================================

export interface PersonFormProps {
  data: PersonSchema;
  updateField: <K extends keyof PersonSchema>(
    field: K,
    value: PersonSchema[K],
  ) => void;
  addSocial: () => void;
  removeSocial: (index: number) => void;
  updateSocial: (index: number, value: string) => void;
}

export function PersonForm({
  data,
  updateField,
  addSocial,
  removeSocial,
  updateSocial,
}: PersonFormProps) {
  return (
    <div className="space-y-4">
      <FormField label="Name *">
        <Input
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="John Doe"
        />
      </FormField>
      <FormField label="Job Title">
        <Input
          value={data.jobTitle}
          onChange={(e) => updateField("jobTitle", e.target.value)}
          placeholder="Software Engineer"
        />
      </FormField>
      <FormField label="Website URL">
        <Input
          value={data.url}
          onChange={(e) => updateField("url", e.target.value)}
          placeholder="https://johndoe.com"
        />
      </FormField>
      <FormField label="Image URL">
        <Input
          value={data.image}
          onChange={(e) => updateField("image", e.target.value)}
          placeholder="https://example.com/photo.jpg"
        />
      </FormField>
      <FormField label="Email">
        <Input
          value={data.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="john@example.com"
        />
      </FormField>

      <div className="space-y-3">
        <Label>Social Profiles</Label>
        {data.sameAs.map((url, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => updateSocial(index, e.target.value)}
              placeholder="https://linkedin.com/in/..."
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSocial(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addSocial} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Social Profile
        </Button>
      </div>
    </div>
  );
}

// ============================================
// Event Form
// ============================================

export function EventForm({ data, updateField }: FormProps<EventSchema>) {
  return (
    <div className="space-y-4">
      <FormField label="Event Name *">
        <Input
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Event name"
        />
      </FormField>
      <FormField label="Description">
        <Textarea
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Event description"
          rows={2}
        />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Start Date *">
          <Input
            type="datetime-local"
            value={data.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
          />
        </FormField>
        <FormField label="End Date">
          <Input
            type="datetime-local"
            value={data.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
          />
        </FormField>
      </div>
      <FormField label="Venue Name *">
        <Input
          value={data.locationName}
          onChange={(e) => updateField("locationName", e.target.value)}
          placeholder="Convention Center"
        />
      </FormField>
      <FormField label="Street Address">
        <Input
          value={data.streetAddress}
          onChange={(e) => updateField("streetAddress", e.target.value)}
          placeholder="123 Main St"
        />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="City *">
          <Input
            value={data.addressLocality}
            onChange={(e) => updateField("addressLocality", e.target.value)}
            placeholder="New York"
          />
        </FormField>
        <FormField label="Country *">
          <Input
            value={data.addressCountry}
            onChange={(e) => updateField("addressCountry", e.target.value)}
            placeholder="US"
          />
        </FormField>
      </div>
      <FormField label="Image URL">
        <Input
          value={data.image}
          onChange={(e) => updateField("image", e.target.value)}
          placeholder="https://example.com/event.jpg"
        />
      </FormField>
      <FormField label="Ticket URL">
        <Input
          value={data.ticketUrl}
          onChange={(e) => updateField("ticketUrl", e.target.value)}
          placeholder="https://tickets.example.com"
        />
      </FormField>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Price">
          <Input
            value={data.price}
            onChange={(e) => updateField("price", e.target.value)}
            placeholder="25"
          />
        </FormField>
        <FormField label="Currency">
          <Input
            value={data.priceCurrency}
            onChange={(e) => updateField("priceCurrency", e.target.value)}
            placeholder="USD"
          />
        </FormField>
        <FormField label="Availability">
          <Select
            value={data.availability}
            onValueChange={(v) =>
              updateField("availability", v as EventSchema["availability"])
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="InStock">Available</SelectItem>
              <SelectItem value="SoldOut">Sold Out</SelectItem>
              <SelectItem value="PreOrder">Pre-Sale</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <FormField label="Organizer Name">
        <Input
          value={data.organizerName}
          onChange={(e) => updateField("organizerName", e.target.value)}
          placeholder="Organization name"
        />
      </FormField>
    </div>
  );
}

// ============================================
// Recipe Form
// ============================================

export interface RecipeFormProps {
  data: RecipeSchema;
  updateField: <K extends keyof RecipeSchema>(
    field: K,
    value: RecipeSchema[K],
  ) => void;
  addIngredient: () => void;
  removeIngredient: (index: number) => void;
  updateIngredient: (index: number, value: string) => void;
  addInstruction: () => void;
  removeInstruction: (index: number) => void;
  updateInstruction: (index: number, value: string) => void;
}

export function RecipeForm({
  data,
  updateField,
  addIngredient,
  removeIngredient,
  updateIngredient,
  addInstruction,
  removeInstruction,
  updateInstruction,
}: RecipeFormProps) {
  return (
    <div className="space-y-4">
      <FormField label="Recipe Name *">
        <Input
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Chocolate Cake"
        />
      </FormField>
      <FormField label="Description">
        <Textarea
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="A delicious chocolate cake..."
          rows={2}
        />
      </FormField>
      <FormField label="Image URL">
        <Input
          value={data.image}
          onChange={(e) => updateField("image", e.target.value)}
          placeholder="https://example.com/recipe.jpg"
        />
      </FormField>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Prep Time" description="ISO 8601 (e.g., PT15M)">
          <Input
            value={data.prepTime}
            onChange={(e) => updateField("prepTime", e.target.value)}
            placeholder="PT15M"
          />
        </FormField>
        <FormField label="Cook Time">
          <Input
            value={data.cookTime}
            onChange={(e) => updateField("cookTime", e.target.value)}
            placeholder="PT30M"
          />
        </FormField>
        <FormField label="Total Time">
          <Input
            value={data.totalTime}
            onChange={(e) => updateField("totalTime", e.target.value)}
            placeholder="PT45M"
          />
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Servings">
          <Input
            value={data.servings}
            onChange={(e) => updateField("servings", e.target.value)}
            placeholder="4"
          />
        </FormField>
        <FormField label="Calories">
          <Input
            value={data.calories}
            onChange={(e) => updateField("calories", e.target.value)}
            placeholder="350"
          />
        </FormField>
        <FormField label="Author Name">
          <Input
            value={data.authorName}
            onChange={(e) => updateField("authorName", e.target.value)}
            placeholder="Chef John"
          />
        </FormField>
      </div>

      <div className="space-y-3">
        <Label>Ingredients *</Label>
        {data.ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              placeholder="1 cup flour"
            />
            {data.ingredients.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeIngredient(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline" onClick={addIngredient} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Ingredient
        </Button>
      </div>

      <div className="space-y-3">
        <Label>Instructions *</Label>
        {data.instructions.map((instruction, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-shrink-0 w-8 h-10 flex items-center justify-center text-sm font-medium text-muted-foreground">
              {index + 1}.
            </div>
            <Textarea
              value={instruction}
              onChange={(e) => updateInstruction(index, e.target.value)}
              placeholder="Mix ingredients..."
              rows={2}
              className="flex-1"
            />
            {data.instructions.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeInstruction(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline" onClick={addInstruction} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Step
        </Button>
      </div>
    </div>
  );
}

// ============================================
// Breadcrumb Form
// ============================================

export interface BreadcrumbFormProps {
  data: BreadcrumbSchema;
  addItem: () => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, field: "name" | "url", value: string) => void;
}

export function BreadcrumbForm({
  data,
  addItem,
  removeItem,
  updateItem,
}: BreadcrumbFormProps) {
  return (
    <div className="space-y-4">
      <Label>Breadcrumb Items</Label>
      {data.items.map((item, index) => (
        <div key={index} className="flex gap-2 items-start">
          <div className="flex-shrink-0 w-8 h-10 flex items-center justify-center text-sm font-medium text-muted-foreground">
            {index + 1}.
          </div>
          <div className="flex-1 grid gap-2 md:grid-cols-2">
            <Input
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              placeholder="Page name"
            />
            <Input
              value={item.url}
              onChange={(e) => updateItem(index, "url", e.target.value)}
              placeholder="/path/to/page"
            />
          </div>
          {data.items.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button variant="outline" onClick={addItem} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Breadcrumb Item
      </Button>
    </div>
  );
}
