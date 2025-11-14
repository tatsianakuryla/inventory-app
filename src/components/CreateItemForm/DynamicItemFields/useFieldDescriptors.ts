import { useMemo } from 'react';
import type { FieldKey, InventoryFields } from '../../../api/InventoryService/inventory.schemas';
import { FieldStates } from '../../../shared/types/enums';

export type FieldDescriptor =
  | { key: FieldKey; type: 'text'; label?: string | null; desc?: string | null }
  | { key: FieldKey; type: 'long'; label?: string | null; desc?: string | null }
  | { key: FieldKey; type: 'number'; label?: string | null; desc?: string | null }
  | { key: FieldKey; type: 'link'; label?: string | null; desc?: string | null }
  | { key: FieldKey; type: 'bool'; label?: string | null; desc?: string | null };

export function useFieldDescriptors(fields: InventoryFields): FieldDescriptor[] {
  return useMemo(() => {
    const descriptors: FieldDescriptor[] = [
      ...(fields.text1State === FieldStates.SHOWN
        ? [
            {
              key: 'text1' as const,
              type: 'text' as const,
              label: fields.text1Name,
              desc: fields.text1Desc,
            },
          ]
        : []),
      ...(fields.text2State === FieldStates.SHOWN
        ? [
            {
              key: 'text2' as const,
              type: 'text' as const,
              label: fields.text2Name,
              desc: fields.text2Desc,
            },
          ]
        : []),
      ...(fields.text3State === FieldStates.SHOWN
        ? [
            {
              key: 'text3' as const,
              type: 'text' as const,
              label: fields.text3Name,
              desc: fields.text3Desc,
            },
          ]
        : []),

      ...(fields.long1State === FieldStates.SHOWN
        ? [
            {
              key: 'long1' as const,
              type: 'long' as const,
              label: fields.long1Name,
              desc: fields.long1Desc,
            },
          ]
        : []),
      ...(fields.long2State === FieldStates.SHOWN
        ? [
            {
              key: 'long2' as const,
              type: 'long' as const,
              label: fields.long2Name,
              desc: fields.long2Desc,
            },
          ]
        : []),
      ...(fields.long3State === FieldStates.SHOWN
        ? [
            {
              key: 'long3' as const,
              type: 'long' as const,
              label: fields.long3Name,
              desc: fields.long3Desc,
            },
          ]
        : []),

      ...(fields.num1State === FieldStates.SHOWN
        ? [
            {
              key: 'num1' as const,
              type: 'number' as const,
              label: fields.num1Name,
              desc: fields.num1Desc,
            },
          ]
        : []),
      ...(fields.num2State === FieldStates.SHOWN
        ? [
            {
              key: 'num2' as const,
              type: 'number' as const,
              label: fields.num2Name,
              desc: fields.num2Desc,
            },
          ]
        : []),
      ...(fields.num3State === FieldStates.SHOWN
        ? [
            {
              key: 'num3' as const,
              type: 'number' as const,
              label: fields.num3Name,
              desc: fields.num3Desc,
            },
          ]
        : []),

      ...(fields.link1State === FieldStates.SHOWN
        ? [
            {
              key: 'link1' as const,
              type: 'link' as const,
              label: fields.link1Name,
              desc: fields.link1Desc,
            },
          ]
        : []),
      ...(fields.link2State === FieldStates.SHOWN
        ? [
            {
              key: 'link2' as const,
              type: 'link' as const,
              label: fields.link2Name,
              desc: fields.link2Desc,
            },
          ]
        : []),
      ...(fields.link3State === FieldStates.SHOWN
        ? [
            {
              key: 'link3' as const,
              type: 'link' as const,
              label: fields.link3Name,
              desc: fields.link3Desc,
            },
          ]
        : []),

      ...(fields.bool1State === FieldStates.SHOWN
        ? [
            {
              key: 'bool1' as const,
              type: 'bool' as const,
              label: fields.bool1Name,
              desc: fields.bool1Desc,
            },
          ]
        : []),
      ...(fields.bool2State === FieldStates.SHOWN
        ? [
            {
              key: 'bool2' as const,
              type: 'bool' as const,
              label: fields.bool2Name,
              desc: fields.bool2Desc,
            },
          ]
        : []),
      ...(fields.bool3State === FieldStates.SHOWN
        ? [
            {
              key: 'bool3' as const,
              type: 'bool' as const,
              label: fields.bool3Name,
              desc: fields.bool3Desc,
            },
          ]
        : []),
    ].filter((d) => d.label);

    return descriptors;
  }, [fields]);
}
