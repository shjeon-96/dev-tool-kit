import type { CheatsheetItem } from "../model/types";

export const vueSyntax: CheatsheetItem[] = [
  // Composition API
  {
    code: "<script setup>",
    name: "Script setup",
    description: "Composition API with compile-time sugar",
    category: "Composition API",
  },
  {
    code: "const count = ref(0)",
    name: "ref",
    description: "Reactive reference for primitives",
    category: "Composition API",
  },
  {
    code: "const state = reactive({ count: 0 })",
    name: "reactive",
    description: "Reactive object state",
    category: "Composition API",
  },
  {
    code: "const doubled = computed(() => count.value * 2)",
    name: "computed",
    description: "Computed property",
    category: "Composition API",
  },
  {
    code: "watch(source, (newVal, oldVal) => {})",
    name: "watch",
    description: "Watch reactive source",
    category: "Composition API",
  },
  {
    code: "watchEffect(() => console.log(count.value))",
    name: "watchEffect",
    description: "Auto-tracking reactive effect",
    category: "Composition API",
  },
  {
    code: "const { x, y } = toRefs(props)",
    name: "toRefs",
    description: "Convert reactive object to refs",
    category: "Composition API",
  },
  {
    code: "const raw = toRaw(reactiveObj)",
    name: "toRaw",
    description: "Get raw object from reactive",
    category: "Composition API",
  },

  // Lifecycle Hooks
  {
    code: "onMounted(() => {})",
    name: "onMounted",
    description: "Called after component mounted",
    category: "Lifecycle",
  },
  {
    code: "onUpdated(() => {})",
    name: "onUpdated",
    description: "Called after DOM update",
    category: "Lifecycle",
  },
  {
    code: "onUnmounted(() => {})",
    name: "onUnmounted",
    description: "Called before unmount",
    category: "Lifecycle",
  },
  {
    code: "onBeforeMount(() => {})",
    name: "onBeforeMount",
    description: "Called before mounting",
    category: "Lifecycle",
  },
  {
    code: "onBeforeUpdate(() => {})",
    name: "onBeforeUpdate",
    description: "Called before DOM update",
    category: "Lifecycle",
  },
  {
    code: "onBeforeUnmount(() => {})",
    name: "onBeforeUnmount",
    description: "Called before unmounting",
    category: "Lifecycle",
  },

  // Template Directives
  {
    code: "v-bind:attr or :attr",
    name: "v-bind",
    description: "Bind attribute dynamically",
    category: "Directives",
  },
  {
    code: "v-on:event or @event",
    name: "v-on",
    description: "Attach event listener",
    category: "Directives",
  },
  {
    code: "v-model",
    name: "v-model",
    description: "Two-way data binding",
    category: "Directives",
  },
  {
    code: "v-if / v-else-if / v-else",
    name: "v-if",
    description: "Conditional rendering",
    category: "Directives",
  },
  {
    code: "v-show",
    name: "v-show",
    description: "Toggle display CSS property",
    category: "Directives",
  },
  {
    code: 'v-for="item in items" :key="item.id"',
    name: "v-for",
    description: "List rendering with key",
    category: "Directives",
  },
  {
    code: "v-slot:name or #name",
    name: "v-slot",
    description: "Named slot content",
    category: "Directives",
  },
  {
    code: 'v-html="rawHtml"',
    name: "v-html",
    description: "Render raw HTML",
    category: "Directives",
  },
  {
    code: 'v-text="text"',
    name: "v-text",
    description: "Update element text content",
    category: "Directives",
  },
  {
    code: "v-once",
    name: "v-once",
    description: "Render element only once",
    category: "Directives",
  },
  {
    code: "v-pre",
    name: "v-pre",
    description: "Skip compilation for element",
    category: "Directives",
  },
  {
    code: "v-cloak",
    name: "v-cloak",
    description: "Hide until compiled",
    category: "Directives",
  },

  // Props & Events
  {
    code: "defineProps<{ msg: string }>()",
    name: "defineProps",
    description: "Declare component props",
    category: "Props & Events",
  },
  {
    code: "defineEmits<{ (e: 'change', id: number): void }>()",
    name: "defineEmits",
    description: "Declare component events",
    category: "Props & Events",
  },
  {
    code: "const props = withDefaults(defineProps<Props>(), { msg: 'hi' })",
    name: "withDefaults",
    description: "Props with default values",
    category: "Props & Events",
  },
  {
    code: "emit('eventName', payload)",
    name: "emit",
    description: "Emit custom event",
    category: "Props & Events",
  },
  {
    code: "defineExpose({ publicMethod })",
    name: "defineExpose",
    description: "Expose public properties",
    category: "Props & Events",
  },

  // Slots
  {
    code: "<slot />",
    name: "Default slot",
    description: "Default slot outlet",
    category: "Slots",
  },
  {
    code: '<slot name="header" />',
    name: "Named slot",
    description: "Named slot outlet",
    category: "Slots",
  },
  {
    code: '<slot :item="item" />',
    name: "Scoped slot",
    description: "Slot with data binding",
    category: "Slots",
  },
  {
    code: '<template #default="{ item }">',
    name: "Scoped slot usage",
    description: "Receive scoped slot data",
    category: "Slots",
  },
  {
    code: "$slots.default?.()",
    name: "$slots",
    description: "Access slots programmatically",
    category: "Slots",
  },

  // Provide/Inject
  {
    code: "provide('key', value)",
    name: "provide",
    description: "Provide value to descendants",
    category: "Provide/Inject",
  },
  {
    code: "const value = inject('key')",
    name: "inject",
    description: "Inject ancestor value",
    category: "Provide/Inject",
  },
  {
    code: "const value = inject('key', defaultValue)",
    name: "inject default",
    description: "Inject with default value",
    category: "Provide/Inject",
  },
  {
    code: "const key = Symbol() as InjectionKey<Type>",
    name: "InjectionKey",
    description: "Type-safe injection key",
    category: "Provide/Inject",
  },

  // Composables
  {
    code: "function useFeature() { return { state, actions } }",
    name: "Composable",
    description: "Reusable composition function",
    category: "Composables",
  },
  {
    code: "const { data, error } = useFetch(url)",
    name: "useFetch pattern",
    description: "Data fetching composable",
    category: "Composables",
  },
  {
    code: "const { x, y } = useMouse()",
    name: "useMouse pattern",
    description: "Mouse position composable",
    category: "Composables",
  },

  // Template Refs
  {
    code: "const inputRef = ref<HTMLInputElement | null>(null)",
    name: "Template ref",
    description: "Reference to DOM element",
    category: "Refs",
  },
  {
    code: '<input ref="inputRef" />',
    name: "ref attribute",
    description: "Attach ref to element",
    category: "Refs",
  },
  {
    code: "const compRef = ref<InstanceType<typeof Comp> | null>(null)",
    name: "Component ref",
    description: "Reference to component instance",
    category: "Refs",
  },

  // Async Components
  {
    code: "const Comp = defineAsyncComponent(() => import('./Comp.vue'))",
    name: "defineAsyncComponent",
    description: "Lazy-load component",
    category: "Async",
  },
  {
    code: "<Suspense><template #default>...",
    name: "Suspense",
    description: "Handle async dependencies",
    category: "Async",
  },

  // Teleport
  {
    code: '<Teleport to="body">...',
    name: "Teleport",
    description: "Render in different DOM location",
    category: "Advanced",
  },
  {
    code: '<Teleport to="#modal-container" :disabled="inline">',
    name: "Teleport disabled",
    description: "Conditionally teleport",
    category: "Advanced",
  },

  // Transition
  {
    code: '<Transition name="fade">...',
    name: "Transition",
    description: "Single element transition",
    category: "Transitions",
  },
  {
    code: '<TransitionGroup name="list" tag="ul">',
    name: "TransitionGroup",
    description: "List transition",
    category: "Transitions",
  },
  {
    code: "@before-enter @enter @after-enter @leave",
    name: "Transition hooks",
    description: "JavaScript transition hooks",
    category: "Transitions",
  },

  // Built-in Components
  {
    code: "<KeepAlive>...",
    name: "KeepAlive",
    description: "Cache component instance",
    category: "Built-in",
  },
  {
    code: '<component :is="currentComponent" />',
    name: "Dynamic component",
    description: "Render dynamic component",
    category: "Built-in",
  },

  // Modifiers
  {
    code: "@click.stop",
    name: ".stop",
    description: "Stop event propagation",
    category: "Modifiers",
  },
  {
    code: "@click.prevent",
    name: ".prevent",
    description: "Prevent default behavior",
    category: "Modifiers",
  },
  {
    code: "@keyup.enter",
    name: ".enter",
    description: "Key modifier",
    category: "Modifiers",
  },
  {
    code: "v-model.lazy",
    name: ".lazy",
    description: "Sync on change instead of input",
    category: "Modifiers",
  },
  {
    code: "v-model.number",
    name: ".number",
    description: "Cast input to number",
    category: "Modifiers",
  },
  {
    code: "v-model.trim",
    name: ".trim",
    description: "Trim input whitespace",
    category: "Modifiers",
  },

  // Router (Vue Router)
  {
    code: '<RouterLink to="/path">',
    name: "RouterLink",
    description: "Navigation link",
    category: "Vue Router",
  },
  {
    code: "<RouterView />",
    name: "RouterView",
    description: "Route component outlet",
    category: "Vue Router",
  },
  {
    code: "const route = useRoute()",
    name: "useRoute",
    description: "Access current route",
    category: "Vue Router",
  },
  {
    code: "const router = useRouter()",
    name: "useRouter",
    description: "Access router instance",
    category: "Vue Router",
  },
  {
    code: "router.push('/path')",
    name: "router.push",
    description: "Navigate programmatically",
    category: "Vue Router",
  },
  {
    code: "route.params.id",
    name: "Route params",
    description: "Access route parameters",
    category: "Vue Router",
  },

  // Pinia (State Management)
  {
    code: "export const useStore = defineStore('id', () => {})",
    name: "defineStore",
    description: "Define Pinia store",
    category: "Pinia",
  },
  {
    code: "const store = useStore()",
    name: "useStore",
    description: "Use Pinia store",
    category: "Pinia",
  },
  {
    code: "const { count } = storeToRefs(store)",
    name: "storeToRefs",
    description: "Extract refs from store",
    category: "Pinia",
  },
  {
    code: "store.$reset()",
    name: "$reset",
    description: "Reset store to initial state",
    category: "Pinia",
  },
];
