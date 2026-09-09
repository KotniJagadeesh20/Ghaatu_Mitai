import Storefront from '../storefront';
import {notFound} from 'next/navigation';
export default async function Page({params}:{params:Promise<{page:string}>}){const {page}=await params;if(!['shop','about','bulk-orders','wholesale','contact'].includes(page))notFound();return <Storefront page={page}/>}
