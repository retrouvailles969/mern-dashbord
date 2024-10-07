import { useState } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';

import Form from 'components/common/Form';

const CreateStock = () => {
  const { data: user } = useGetIdentity();
  const [stockImage, setStockImage] = useState({ name: '', url: '' });
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setStockImage({ name: file?.name, url: result }));
  };
  
  const onFinishHandler = async (data: FieldValues) => {
    if(!stockImage.name) return alert('Please select an image');
    
    await onFinish({ ...data, photo: stockImage.url, email: user.email })
  };

  return (
    <Form 
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      stockImage={stockImage}
    />
  )
}
export default CreateStock