export interface IElementProps {
  className?: string;
  as?: string;
  value?: string;
  messages?: string;
  ref?: string;
  type?: string;
}

export interface ElementNode {
  props?: IElementProps;
  id?: string;
  name?: string;
  element?: string;
  $ref?: string;
  children?: ElementNode[];
  layout?: ElementNode[];
  render?: ElementNode[];
  definitions?: Record<string, unknown>;
}

export interface IUpadtedDataStore<T>{
  data:T,
  id:string,
  updated:string,
  elementType:"className"|"text"
}

