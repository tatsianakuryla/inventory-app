export type FieldType = 'text' | 'long' | 'num' | 'link' | 'bool';

export const FIELD_DEFINITIONS: Array<{
  key: string;
  label: string;
  type: FieldType;
  defaultName: string;
}> = [
  { key: 'text1', label: 'Short Text 1', type: 'text', defaultName: 'Text 1' },
  { key: 'text2', label: 'Short Text 2', type: 'text', defaultName: 'Text 2' },
  { key: 'text3', label: 'Short Text 3', type: 'text', defaultName: 'Text 3' },
  { key: 'long1', label: 'Long Text 1', type: 'long', defaultName: 'Description 1' },
  { key: 'long2', label: 'Long Text 2', type: 'long', defaultName: 'Description 2' },
  { key: 'long3', label: 'Long Text 3', type: 'long', defaultName: 'Description 3' },
  { key: 'num1', label: 'Number 1', type: 'num', defaultName: 'Number 1' },
  { key: 'num2', label: 'Number 2', type: 'num', defaultName: 'Number 2' },
  { key: 'num3', label: 'Number 3', type: 'num', defaultName: 'Number 3' },
  { key: 'link1', label: 'Link 1', type: 'link', defaultName: 'Link 1' },
  { key: 'link2', label: 'Link 2', type: 'link', defaultName: 'Link 2' },
  { key: 'link3', label: 'Link 3', type: 'link', defaultName: 'Link 3' },
  { key: 'bool1', label: 'Checkbox 1', type: 'bool', defaultName: 'Boolean 1' },
  { key: 'bool2', label: 'Checkbox 2', type: 'bool', defaultName: 'Boolean 2' },
  { key: 'bool3', label: 'Checkbox 3', type: 'bool', defaultName: 'Boolean 3' },
];
