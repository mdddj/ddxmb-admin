export interface RequestParamError {
  codes: string[];
  arguments: ParamArgument[];
  defaultMessage: string;
  objectName: string;
  field: string;
  rejectedValue: any;
  bindingFailure: boolean;
  code: string;
}

export interface ParamArgument {
  codes: string[];
  arguments: any;
  defaultMessage: string;
  code: string;
}
