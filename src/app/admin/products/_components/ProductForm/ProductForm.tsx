'use client';

import { ChangeEvent, useActionState, useState } from 'react';
import cls from './ProductForm.module.scss'
import Input from '@/components/ui/Input/Input';
import { formatCurrency } from '@/util/formatter';
import { Button } from '@/components/ui/Button/Button';
// import { useFormState } from 'react-dom';
import { addNewProduct } from '@/app/admin/_actions/products';
import { useFormStatus } from 'react-dom';

export function ProductForm() {
  const [priceInCents, setPriceInCents] = useState<number>(0);
  const [formState, formAction, pending] = useActionState(addNewProduct, {});
  // const { pending } = useFormStatus();

  function onPriceInCents(e: ChangeEvent<HTMLInputElement>) {
    setPriceInCents(Number(e.target.value));
  }

  return <form action={formAction}>
    <div className={cls.group}>
      <label htmlFor="name">Name</label>
      <Input id='name' name='name'/>
      {formState?.name && <div className={cls.error}>{formState?.name}</div>}
    </div>

    <div className={cls.group}>
      <label htmlFor="priceInCents">Price In Cents</label>
      <Input id='priceInCents' type='number' name='priceInCents' onChange={onPriceInCents}/>
      {formatCurrency((priceInCents || 0) / 100)}
      {formState?.priceInCents && <div className={cls.error}>{formState?.priceInCents}</div>}
    </div>

    <div className={cls.group}>
      <label htmlFor="description">Description</label>
      <textarea name='description'/>
      {formState?.description && <div className={cls.error}>{formState?.description}</div>}
    </div>

    <div className={cls.group}>
      <label htmlFor="file">File</label>
      <Input id='file' type='file' name='file'/>
      {formState?.file && <div className={cls.error}>{formState?.file}</div>}
    </div>

    <div className={cls.group}>
      <label htmlFor="image">Image</label>
      <Input id='image' type='file' name='image'/>
      {formState?.image && <div className={cls.error}>{formState?.image}</div>}
    </div>

    <Button type='submit' disabled={pending}>{pending ? 'Pending...' : 'Submit'}</Button>
  </form>
}