import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  kode: string,
  labelName: string
}

export interface FormValues {
    kode: string,
    item: string,
    description: string,
    category: string,
    location: string,
    actual: number | undefined,
}

export interface StockCardProps {
  id?: BaseKey | undefined,
  kode: string,
  item: string,
  location: string,
  actual: string,
  photo: string,
}
