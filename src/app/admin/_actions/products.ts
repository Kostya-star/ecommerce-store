'use server';

import { INewProduct } from '@/app/types/IProduct';
import { db } from '@/db/db';
import fs from 'fs/promises'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const formFields: (keyof INewProduct)[] = ['name', 'description', 'priceInCents', 'file', 'image']

export async function addNewProduct(prevState: unknown, formData: FormData): Promise<Partial<Record<keyof INewProduct, string>> | void> {
  const newProduct = Object.fromEntries(formData.entries()) as unknown as INewProduct

  const errors = checkFormErrors(newProduct)

  if(Object.keys(errors).length) {
    return errors;
  }

  const { name, priceInCents, description, image, file } = newProduct;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${file.name}`;
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${image.name}`;
  await fs.writeFile(`public${imagePath}`, Buffer.from(await image.arrayBuffer()));

  await db.product.create({ data: { 
    name,
    priceInCents: Number(priceInCents),
    description,
    isAvailableForPurchase: false,
    filePath,
    imagePath,
   }})

  // revalidatePath("/")
  // revalidatePath("/products")
  redirect('/admin/products')
}

function checkFormErrors(formObj: INewProduct) {
  const errors: Partial<Record<keyof INewProduct, string>> = {}


  for (const key of formFields) {
    const fieldVal = formObj[key];
    
    
    const isStringEmpty = typeof fieldVal === 'string' && !fieldVal.trim(); 
    const isFile = typeof fieldVal !== 'string' && 'name' in fieldVal && 'size' in fieldVal
    const isFileEmpty = isFile && !fieldVal.size; 

    if (isStringEmpty || isFileEmpty) errors[key] = `Field ${key} is required`;
  }


  return errors;
}