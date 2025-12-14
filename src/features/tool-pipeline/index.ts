export { PipelineButton } from "./ui/pipeline-button";
export { PipelineNotification } from "./ui/pipeline-notification";
export {
  usePipeline,
  usePipelineReceiver,
  usePipelineInput,
} from "./model/use-pipeline";
export {
  // Legacy connection functions (backward compatible)
  getConnectableTools,
  canConnect,
  TOOL_CONNECTIONS,
  // New data type system
  TOOL_DATA_TYPES,
  getCompatibleTypes,
  isDataTypeCompatible,
  getToolsThatCanSendTo,
  getToolsThatCanReceiveFrom,
  // Types
  type Pipeline,
  type PipelineStep,
  type PipelineConnection,
  type PipelineDataType,
  type ToolDataTypes,
} from "./model/types";
