import type { CheatsheetItem } from "../model/types";

export const reactSyntax: CheatsheetItem[] = [
  // Components
  {
    code: "function Component() { return <div /> }",
    name: "Function component",
    description: "Basic function component",
    category: "Components",
  },
  {
    code: "const Component = () => <div />",
    name: "Arrow component",
    description: "Arrow function component",
    category: "Components",
  },
  {
    code: "export default function Component() {}",
    name: "Default export",
    description: "Export component as default",
    category: "Components",
  },
  {
    code: "function Component({ prop }: Props) {}",
    name: "Props typing",
    description: "TypeScript props interface",
    category: "Components",
  },
  {
    code: "function Component({ children }: PropsWithChildren) {}",
    name: "Children prop",
    description: "Component with children",
    category: "Components",
  },
  {
    code: "<Component {...props} />",
    name: "Spread props",
    description: "Pass all props via spread",
    category: "Components",
  },

  // JSX
  {
    code: '<div className="name">content</div>',
    name: "className",
    description: "CSS class attribute",
    category: "JSX",
  },
  {
    code: "{condition && <Component />}",
    name: "Conditional render",
    description: "Render if condition is true",
    category: "JSX",
  },
  {
    code: "{condition ? <A /> : <B />}",
    name: "Ternary render",
    description: "Render A or B based on condition",
    category: "JSX",
  },
  {
    code: "{items.map(item => <Item key={item.id} />)}",
    name: "List render",
    description: "Render list with unique keys",
    category: "JSX",
  },
  {
    code: "<>{elements}</>",
    name: "Fragment",
    description: "Group elements without wrapper",
    category: "JSX",
  },
  {
    code: "<React.Fragment key={id}>{elements}</React.Fragment>",
    name: "Keyed fragment",
    description: "Fragment with key prop",
    category: "JSX",
  },
  {
    code: "style={{ color: 'red', fontSize: 16 }}",
    name: "Inline style",
    description: "Inline styles as object",
    category: "JSX",
  },
  {
    code: "dangerouslySetInnerHTML={{ __html: html }}",
    name: "Raw HTML",
    description: "Insert raw HTML (use carefully)",
    category: "JSX",
  },

  // useState
  {
    code: "const [state, setState] = useState(initial)",
    name: "useState",
    description: "State hook with initial value",
    category: "useState",
  },
  {
    code: "const [state, setState] = useState<Type>(initial)",
    name: "Typed useState",
    description: "State with TypeScript type",
    category: "useState",
  },
  {
    code: "setState(newValue)",
    name: "Set state",
    description: "Update state with new value",
    category: "useState",
  },
  {
    code: "setState(prev => prev + 1)",
    name: "Functional update",
    description: "Update based on previous state",
    category: "useState",
  },
  {
    code: "const [state, setState] = useState(() => expensiveInit())",
    name: "Lazy initial state",
    description: "Compute initial state once",
    category: "useState",
  },

  // useEffect
  {
    code: "useEffect(() => { /* effect */ }, [])",
    name: "useEffect mount",
    description: "Run once on mount",
    category: "useEffect",
  },
  {
    code: "useEffect(() => { /* effect */ }, [dep])",
    name: "useEffect deps",
    description: "Run when dependencies change",
    category: "useEffect",
  },
  {
    code: "useEffect(() => { return () => cleanup() }, [])",
    name: "useEffect cleanup",
    description: "Cleanup on unmount",
    category: "useEffect",
  },
  {
    code: "useEffect(() => { /* effect */ })",
    name: "useEffect every render",
    description: "Run after every render (avoid)",
    category: "useEffect",
  },

  // useRef
  {
    code: "const ref = useRef<HTMLDivElement>(null)",
    name: "useRef DOM",
    description: "Reference to DOM element",
    category: "useRef",
  },
  {
    code: "<div ref={ref} />",
    name: "Attach ref",
    description: "Attach ref to element",
    category: "useRef",
  },
  {
    code: "ref.current",
    name: "Access ref",
    description: "Access current ref value",
    category: "useRef",
  },
  {
    code: "const valueRef = useRef(initialValue)",
    name: "useRef value",
    description: "Mutable value that persists",
    category: "useRef",
  },

  // useMemo & useCallback
  {
    code: "const memoized = useMemo(() => compute(a, b), [a, b])",
    name: "useMemo",
    description: "Memoize expensive computation",
    category: "Memoization",
  },
  {
    code: "const callback = useCallback(() => fn(a), [a])",
    name: "useCallback",
    description: "Memoize callback function",
    category: "Memoization",
  },
  {
    code: "const MemoComponent = React.memo(Component)",
    name: "React.memo",
    description: "Memoize component render",
    category: "Memoization",
  },
  {
    code: "React.memo(Component, (prev, next) => areEqual)",
    name: "Custom memo compare",
    description: "Custom comparison function",
    category: "Memoization",
  },

  // useContext
  {
    code: "const Context = createContext<Type>(defaultValue)",
    name: "createContext",
    description: "Create context with default",
    category: "Context",
  },
  {
    code: "<Context.Provider value={value}>{children}</Context.Provider>",
    name: "Provider",
    description: "Provide context value",
    category: "Context",
  },
  {
    code: "const value = useContext(Context)",
    name: "useContext",
    description: "Consume context value",
    category: "Context",
  },
  {
    code: "const Context = createContext<Type | null>(null)",
    name: "Nullable context",
    description: "Context that may be null",
    category: "Context",
  },

  // useReducer
  {
    code: "const [state, dispatch] = useReducer(reducer, initialState)",
    name: "useReducer",
    description: "State with reducer pattern",
    category: "useReducer",
  },
  {
    code: "function reducer(state, action) { switch(action.type) {} }",
    name: "Reducer function",
    description: "Reducer with action types",
    category: "useReducer",
  },
  {
    code: "dispatch({ type: 'ACTION', payload: data })",
    name: "Dispatch action",
    description: "Dispatch action to reducer",
    category: "useReducer",
  },

  // Custom Hooks
  {
    code: "function useCustomHook() { return { state, actions } }",
    name: "Custom hook",
    description: "Create reusable hook",
    category: "Custom Hooks",
  },
  {
    code: "function useLocalStorage<T>(key: string, initial: T)",
    name: "useLocalStorage",
    description: "Sync state with localStorage",
    category: "Custom Hooks",
  },
  {
    code: "function useDebounce<T>(value: T, delay: number)",
    name: "useDebounce",
    description: "Debounce value changes",
    category: "Custom Hooks",
  },
  {
    code: "function usePrevious<T>(value: T)",
    name: "usePrevious",
    description: "Track previous value",
    category: "Custom Hooks",
  },

  // Event Handlers
  {
    code: "onClick={() => handleClick()}",
    name: "Click handler",
    description: "Handle click event",
    category: "Events",
  },
  {
    code: "onChange={(e) => setValue(e.target.value)}",
    name: "Change handler",
    description: "Handle input change",
    category: "Events",
  },
  {
    code: "onSubmit={(e) => { e.preventDefault(); }}",
    name: "Submit handler",
    description: "Handle form submit",
    category: "Events",
  },
  {
    code: "onKeyDown={(e) => e.key === 'Enter' && submit()}",
    name: "Key handler",
    description: "Handle keyboard events",
    category: "Events",
  },
  {
    code: "React.ChangeEvent<HTMLInputElement>",
    name: "Event types",
    description: "TypeScript event types",
    category: "Events",
  },
  {
    code: "React.MouseEvent<HTMLButtonElement>",
    name: "Mouse event type",
    description: "TypeScript mouse event",
    category: "Events",
  },

  // Forms
  {
    code: "<input value={value} onChange={e => setValue(e.target.value)} />",
    name: "Controlled input",
    description: "Input controlled by state",
    category: "Forms",
  },
  {
    code: "<input ref={inputRef} defaultValue={initial} />",
    name: "Uncontrolled input",
    description: "Input with ref access",
    category: "Forms",
  },
  {
    code: '<input type="checkbox" checked={isChecked} onChange={toggle} />',
    name: "Checkbox",
    description: "Controlled checkbox",
    category: "Forms",
  },
  {
    code: "<select value={selected} onChange={e => setSelected(e.target.value)}>",
    name: "Select",
    description: "Controlled select",
    category: "Forms",
  },
  {
    code: "<textarea value={text} onChange={e => setText(e.target.value)} />",
    name: "Textarea",
    description: "Controlled textarea",
    category: "Forms",
  },

  // Portals & Suspense
  {
    code: "createPortal(children, document.body)",
    name: "Portal",
    description: "Render outside DOM hierarchy",
    category: "Advanced",
  },
  {
    code: "<Suspense fallback={<Loading />}><Component /></Suspense>",
    name: "Suspense",
    description: "Show fallback while loading",
    category: "Advanced",
  },
  {
    code: "const Component = lazy(() => import('./Component'))",
    name: "Lazy loading",
    description: "Code-split component",
    category: "Advanced",
  },
  {
    code: "<ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>",
    name: "Error boundary",
    description: "Catch rendering errors",
    category: "Advanced",
  },

  // React 18+
  {
    code: "const [isPending, startTransition] = useTransition()",
    name: "useTransition",
    description: "Mark non-urgent updates",
    category: "React 18+",
  },
  {
    code: "startTransition(() => setState(newValue))",
    name: "Start transition",
    description: "Wrap non-urgent update",
    category: "React 18+",
  },
  {
    code: "const deferredValue = useDeferredValue(value)",
    name: "useDeferredValue",
    description: "Defer non-urgent value",
    category: "React 18+",
  },
  {
    code: "const id = useId()",
    name: "useId",
    description: "Generate unique ID for accessibility",
    category: "React 18+",
  },
  {
    code: "useSyncExternalStore(subscribe, getSnapshot)",
    name: "useSyncExternalStore",
    description: "Subscribe to external store",
    category: "React 18+",
  },

  // React 19+
  {
    code: "const [state, formAction] = useActionState(action, initial)",
    name: "useActionState",
    description: "Handle form actions with state",
    category: "React 19+",
  },
  {
    code: "const { pending } = useFormStatus()",
    name: "useFormStatus",
    description: "Get form submission status",
    category: "React 19+",
  },
  {
    code: "const optimisticValue = useOptimistic(value, updateFn)",
    name: "useOptimistic",
    description: "Optimistic UI updates",
    category: "React 19+",
  },
  {
    code: "'use client'",
    name: "Client directive",
    description: "Mark as client component",
    category: "React 19+",
  },
  {
    code: "'use server'",
    name: "Server directive",
    description: "Mark as server action",
    category: "React 19+",
  },
  {
    code: "use(promise)",
    name: "use",
    description: "Unwrap promise or context",
    category: "React 19+",
  },

  // Patterns
  {
    code: "const Component = forwardRef<Ref, Props>((props, ref) => {})",
    name: "forwardRef",
    description: "Forward ref to child",
    category: "Patterns",
  },
  {
    code: "useImperativeHandle(ref, () => ({ focus: () => {} }))",
    name: "useImperativeHandle",
    description: "Expose methods via ref",
    category: "Patterns",
  },
  {
    code: "function HOC(Component) { return (props) => <Component {...props} /> }",
    name: "HOC pattern",
    description: "Higher-order component",
    category: "Patterns",
  },
  {
    code: "<Component render={(data) => <Child data={data} />} />",
    name: "Render props",
    description: "Pass render function as prop",
    category: "Patterns",
  },
  {
    code: "const CompoundComponent = Object.assign(Parent, { Child })",
    name: "Compound component",
    description: "Compose related components",
    category: "Patterns",
  },
  {
    code: "cloneElement(child, { additionalProp: value })",
    name: "cloneElement",
    description: "Clone element with new props",
    category: "Patterns",
  },
];
