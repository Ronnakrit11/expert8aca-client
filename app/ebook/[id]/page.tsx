import EbookDetailsPage from '@/app/components/Ebook/EbookDetailsPage'
import dynamic from 'next/dynamic';
import React from 'react'
  
const page = ({ params }: any) => {
    return (
        <div><EbookDetailsPage id={params.id} /></div>
    )
}

export default page