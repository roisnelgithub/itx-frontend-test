import { Button } from '@/components/ui/button';
import React from 'react';


const Product: React.FC = () => {
  return (
    <div >
      <h1>Página Principal de Productos</h1>
      <div className="bg-blue-500 text-white p-4">
        Tailwind funciona correctamente.
      </div>
      <div className='mt-4'>
        <Button>Shadcn funciona</Button>
      </div>
    </div>
  );
};

export default Product;
