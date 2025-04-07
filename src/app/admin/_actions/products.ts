'use server';

import { INewProduct } from '@/app/types/IProduct';
import { db } from '@/db/db';
import fs from 'fs/promises'
import { redirect } from 'next/navigation';

export async function addNewProduct(prevState: unknown, formData: FormData): Promise<Partial<Record<keyof INewProduct, string>> | void> {
  const newProduct = Object.fromEntries(formData.entries()) as unknown as INewProduct

  const errors = checkFormErrors(newProduct)

  if(Object.keys(errors).length) {
    return errors;
  }


  const { name, priceInCents, description, image, file } = newProduct;


  await fs.mkdir('products', { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${file.name}`;
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()))

  await fs.mkdir('public/products', { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${image.name}`;
  await fs.writeFile(`public${imagePath}`, Buffer.from(await image.arrayBuffer()))

  await db.product.create({ data: { 
    name,
    priceInCents: Number(priceInCents),
    description,
    filePath,
    imagePath,
   }})

  redirect('/admin/products')
}

function checkFormErrors(formObj: INewProduct) {
  const errors: Partial<Record<keyof INewProduct, string>> = {}

  // console.log('formObj', formObj)

  for (const key of Object.keys(formObj) as (keyof INewProduct)[]) {
    const fieldVal = formObj[key];
    
    // console.log('fieldVal', fieldVal)
    
    const isStringEmpty = typeof fieldVal === 'string' && !fieldVal.trim(); 
    const isFile = typeof fieldVal !== 'string' && 'name' in fieldVal && 'size' in fieldVal
    const isFileEmpty = isFile && !fieldVal.size; 
    // console.log('isStringEmpty', isStringEmpty)
    // console.log('isFileEmpty', isFileEmpty)

    if (isStringEmpty || isFileEmpty) errors[key] = `Field ${key} is required`;
  }


  return errors;
}