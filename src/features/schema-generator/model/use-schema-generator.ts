"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  SchemaType,
  SchemaData,
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
  FAQItem,
  HowToStep,
  BreadcrumbItem,
} from "../lib/types";
import {
  DEFAULT_ARTICLE,
  DEFAULT_PRODUCT,
  DEFAULT_FAQ,
  DEFAULT_HOWTO,
  DEFAULT_ORGANIZATION,
  DEFAULT_LOCALBUSINESS,
  DEFAULT_PERSON,
  DEFAULT_EVENT,
  DEFAULT_RECIPE,
  DEFAULT_BREADCRUMB,
} from "../lib/types";
import { generateJsonLd, generateScriptTag } from "../lib/generator";

function getDefaultData(type: SchemaType): SchemaData {
  switch (type) {
    case "Article":
      return { ...DEFAULT_ARTICLE };
    case "Product":
      return { ...DEFAULT_PRODUCT };
    case "FAQPage":
      return { ...DEFAULT_FAQ, items: [{ question: "", answer: "" }] };
    case "HowTo":
      return { ...DEFAULT_HOWTO, steps: [{ name: "", text: "", image: "" }] };
    case "Organization":
      return { ...DEFAULT_ORGANIZATION, sameAs: [] };
    case "LocalBusiness":
      return { ...DEFAULT_LOCALBUSINESS };
    case "Person":
      return { ...DEFAULT_PERSON, sameAs: [] };
    case "Event":
      return { ...DEFAULT_EVENT };
    case "Recipe":
      return { ...DEFAULT_RECIPE, ingredients: [""], instructions: [""] };
    case "BreadcrumbList":
      return { ...DEFAULT_BREADCRUMB, items: [{ name: "Home", url: "/" }] };
    default:
      return { ...DEFAULT_ARTICLE };
  }
}

export function useSchemaGenerator() {
  const [schemaType, setSchemaType] = useState<SchemaType>("Article");
  const [data, setData] = useState<SchemaData>(getDefaultData("Article"));
  const [showScriptTag, setShowScriptTag] = useState(false);

  const handleTypeChange = useCallback((type: SchemaType) => {
    setSchemaType(type);
    setData(getDefaultData(type));
  }, []);

  const updateField = useCallback(
    <K extends keyof SchemaData>(field: K, value: SchemaData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  // FAQ specific methods
  const addFaqItem = useCallback(() => {
    setData((prev) => {
      const faqData = prev as FAQSchema;
      return {
        ...faqData,
        items: [...faqData.items, { question: "", answer: "" }],
      };
    });
  }, []);

  const removeFaqItem = useCallback((index: number) => {
    setData((prev) => {
      const faqData = prev as FAQSchema;
      return {
        ...faqData,
        items: faqData.items.filter((_, i) => i !== index),
      };
    });
  }, []);

  const updateFaqItem = useCallback(
    (index: number, field: keyof FAQItem, value: string) => {
      setData((prev) => {
        const faqData = prev as FAQSchema;
        const newItems = [...faqData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        return { ...faqData, items: newItems };
      });
    },
    [],
  );

  // HowTo specific methods
  const addHowToStep = useCallback(() => {
    setData((prev) => {
      const howToData = prev as HowToSchema;
      return {
        ...howToData,
        steps: [...howToData.steps, { name: "", text: "", image: "" }],
      };
    });
  }, []);

  const removeHowToStep = useCallback((index: number) => {
    setData((prev) => {
      const howToData = prev as HowToSchema;
      return {
        ...howToData,
        steps: howToData.steps.filter((_, i) => i !== index),
      };
    });
  }, []);

  const updateHowToStep = useCallback(
    (index: number, field: keyof HowToStep, value: string) => {
      setData((prev) => {
        const howToData = prev as HowToSchema;
        const newSteps = [...howToData.steps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        return { ...howToData, steps: newSteps };
      });
    },
    [],
  );

  // Recipe specific methods
  const addIngredient = useCallback(() => {
    setData((prev) => {
      const recipeData = prev as RecipeSchema;
      return {
        ...recipeData,
        ingredients: [...recipeData.ingredients, ""],
      };
    });
  }, []);

  const removeIngredient = useCallback((index: number) => {
    setData((prev) => {
      const recipeData = prev as RecipeSchema;
      return {
        ...recipeData,
        ingredients: recipeData.ingredients.filter((_, i) => i !== index),
      };
    });
  }, []);

  const updateIngredient = useCallback((index: number, value: string) => {
    setData((prev) => {
      const recipeData = prev as RecipeSchema;
      const newIngredients = [...recipeData.ingredients];
      newIngredients[index] = value;
      return { ...recipeData, ingredients: newIngredients };
    });
  }, []);

  const addInstruction = useCallback(() => {
    setData((prev) => {
      const recipeData = prev as RecipeSchema;
      return {
        ...recipeData,
        instructions: [...recipeData.instructions, ""],
      };
    });
  }, []);

  const removeInstruction = useCallback((index: number) => {
    setData((prev) => {
      const recipeData = prev as RecipeSchema;
      return {
        ...recipeData,
        instructions: recipeData.instructions.filter((_, i) => i !== index),
      };
    });
  }, []);

  const updateInstruction = useCallback((index: number, value: string) => {
    setData((prev) => {
      const recipeData = prev as RecipeSchema;
      const newInstructions = [...recipeData.instructions];
      newInstructions[index] = value;
      return { ...recipeData, instructions: newInstructions };
    });
  }, []);

  // Breadcrumb specific methods
  const addBreadcrumbItem = useCallback(() => {
    setData((prev) => {
      const breadcrumbData = prev as BreadcrumbSchema;
      return {
        ...breadcrumbData,
        items: [...breadcrumbData.items, { name: "", url: "" }],
      };
    });
  }, []);

  const removeBreadcrumbItem = useCallback((index: number) => {
    setData((prev) => {
      const breadcrumbData = prev as BreadcrumbSchema;
      return {
        ...breadcrumbData,
        items: breadcrumbData.items.filter((_, i) => i !== index),
      };
    });
  }, []);

  const updateBreadcrumbItem = useCallback(
    (index: number, field: keyof BreadcrumbItem, value: string) => {
      setData((prev) => {
        const breadcrumbData = prev as BreadcrumbSchema;
        const newItems = [...breadcrumbData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        return { ...breadcrumbData, items: newItems };
      });
    },
    [],
  );

  // Social links (for Organization/Person)
  const addSocialLink = useCallback(() => {
    setData((prev) => {
      const socialData = prev as OrganizationSchema | PersonSchema;
      return {
        ...socialData,
        sameAs: [...(socialData.sameAs || []), ""],
      };
    });
  }, []);

  const removeSocialLink = useCallback((index: number) => {
    setData((prev) => {
      const socialData = prev as OrganizationSchema | PersonSchema;
      return {
        ...socialData,
        sameAs: socialData.sameAs.filter((_, i) => i !== index),
      };
    });
  }, []);

  const updateSocialLink = useCallback((index: number, value: string) => {
    setData((prev) => {
      const socialData = prev as OrganizationSchema | PersonSchema;
      const newSameAs = [...socialData.sameAs];
      newSameAs[index] = value;
      return { ...socialData, sameAs: newSameAs };
    });
  }, []);

  // Generated output
  const jsonLd = useMemo(() => {
    try {
      return generateJsonLd(schemaType, data);
    } catch {
      return "";
    }
  }, [schemaType, data]);

  const output = useMemo(() => {
    if (!jsonLd) return "";
    return showScriptTag ? generateScriptTag(jsonLd) : jsonLd;
  }, [jsonLd, showScriptTag]);

  const reset = useCallback(() => {
    setData(getDefaultData(schemaType));
  }, [schemaType]);

  return {
    // State
    schemaType,
    data,
    output,
    showScriptTag,

    // Actions
    setSchemaType: handleTypeChange,
    updateField,
    setShowScriptTag,
    reset,

    // FAQ
    addFaqItem,
    removeFaqItem,
    updateFaqItem,

    // HowTo
    addHowToStep,
    removeHowToStep,
    updateHowToStep,

    // Recipe
    addIngredient,
    removeIngredient,
    updateIngredient,
    addInstruction,
    removeInstruction,
    updateInstruction,

    // Breadcrumb
    addBreadcrumbItem,
    removeBreadcrumbItem,
    updateBreadcrumbItem,

    // Social
    addSocialLink,
    removeSocialLink,
    updateSocialLink,
  };
}
