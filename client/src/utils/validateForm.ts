/* eslint-disable no-plusplus */
import { FormValues } from 'interfaces/stock';

export const validateForm = (formValues: FormValues) => {
  const errors: { message: string } = { message: '' };
  let hasError = false;

  Object.keys(formValues).forEach((key) => {
    switch (key) {
      case 'kode':
        if (!formValues.kode) {
          errors.message = 'Kode Item is required';
          hasError = true;
        }
        break;

        case 'item':
          if (!formValues.item) {
            errors.message = 'Item Name is required';
            hasError = true;
          }
          break;

      case 'description':
        if (!formValues.description) {
          errors.message = 'Description is required';
          hasError = true;
        }
        break;

      case 'category':
        if (!formValues.category) {
          errors.message = 'Category is required';
          hasError = true;
        }
        break;

      case 'location':
        if (!formValues.location) {
          errors.message = 'Location is required';
          hasError = true;
        }
        break;

      case 'actual':
        if (!formValues.actual) {
          errors.message = 'Actual Stock is required';
          hasError = true;
        }
        break;

      default:
        hasError = false;
    }
  });

  return { hasError, errors };
};

export const hasChanged = (initialValues: FormValues, currentValues: FormValues) => {
  const initialValuesArray = Object.values(initialValues);
  const currentValuesArray = Object.values(currentValues);
  for (let i = 0; i < initialValuesArray.length; i++) {
    if (initialValuesArray[i] !== currentValuesArray[i]) {
      return true;
    }
  }
  return false;
};
