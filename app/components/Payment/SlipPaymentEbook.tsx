import ImageNext from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegCopy } from "react-icons/fa6";
import toast from "react-hot-toast";
import { FileInput, TextInput, Label, Spinner, Textarea } from "flowbite-react";
import { Button } from "flowbite-react";
import jsQR from 'jsqr';
import { useGetTokenPaymentMutation, useVerifySlipMutation } from '@/redux/features/orders/ordersApi';
import { useRouter } from 'next/navigation';
import { Radio } from "flowbite-react";
import { IoOpenOutline } from "react-icons/io5";
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BANK_ACCOUNT_NAME, BANK_NO, BANK_NO_REPLACE } from './constant';

const MySwal: any = withReactContent(Swal)


interface IProps {
  product: 'course' | 'ebook'
  data: any
}

enum PaymentMethod {
  slip = 'slip',
  visa = 'visa'
}

const SlipPaymentEbook = ({ product, data }: IProps) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {});

  const router = useRouter()
  const [resultQr, setResultQr] = useState('');
  const [ons, setONS] = useState(false)
  const [user, setUser] = useState<any>();
  const [verifySlip, { data: orderData, error, isLoading, isError }] = useVerifySlipMutation()

  const isFree = data?.price === 0;

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(BANK_NO_REPLACE)
    toast.success('คัดลอกเลขบัญชีแล้ว')
  }

  const handleImageUpload = (event) => {
    setONS(true)
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageDataUrl = e.target.result;
        const image = new Image;

        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = image.width;
          canvas.height = image.height;

          ctx?.drawImage(image, 0, 0, image.width, image.height);

          const imageData = ctx?.getImageData(0, 0, image.width, image.height);
          if (!imageData) {
            return toast.error('ไม่สามารถสแกน QR Code ได้');
          }

          const code = jsQR(imageData.data, image.width, image.height);

          if (code) {
            setResultQr(code.data);
            setONS(false)
          } else {
            return toast.error('ไม่สามารถสแกน QR Code ได้');
          }
        };

        image.src = imageDataUrl;
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (orderData) {
      if (orderData.success) {
        toast.success('ยืนยันการโอนเงินเรียบร้อย')
        window.location.href = `/view-pdf/${orderData.result.ebookId}`
      }
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error, isLoading, isError])

  const validateInput = (isCheckQr = true) => {
    if (isCheckQr && !resultQr) {
      toast.error('กรุณาอัพโหลดสลิปโอนเงิน')
      return true
    }

    return false
  }

  const handleCheckSlip = async () => {
    MySwal.fire({
      title: "กำลังตรวจสอบสลิป!",
      html: "กรุณารอสักครู่...",
      timerProgressBar: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    if (validateInput()) {
      return
    }

    const payload = {
      productType: product,
      productId: data._id,
      qrData: resultQr,
      addressInfo: {},
    }
    await verifySlip(payload)
    Swal.close()
  }

  return (
    <div className='text-black font-Poppins '>
      <div>
        <div className=''>
          <div>
            <p className='text-left text-[18px] font-semibold'>ยืนยันการโอนเงิน</p>
            <div className='flex flex-col justify-center items-center gap-4 mt-5'>
              <ImageNext alt='' src='/kbank-logo.png' width={300} height={300} />
              <p className='text-xl text-gray-700'>เลขบัญชี</p>
              <p onClick={handleCopy} className='text-xl md:text-2xl px-10 md:px-20 py-2 bg-slate-300 flex justify-center items-center relative cursor-pointer'>{BANK_NO} <FaRegCopy className=' cursor-pointer absolute right-0 pr-3 text-3xl' /></p>
              <div className='text-sm mt-[-13px]'>{BANK_ACCOUNT_NAME}</div>
              <div>ยอดรวมราคา <span className=' underline font-semibold'>{data?.price?.toLocaleString() ?? ''}</span> บาท</div>
              <p>อัพโหลดสลิปโอนเงิน</p>
              <p className='text-[red] text-[12px] mt-[-20px]'>*โปรดตรวจสอบสลิปก่อนทำรายการ</p>
              <div>
                <FileInput name="file" className='w-100' accept="image/*" id="file-upload" onChange={handleImageUpload} />
              </div>
              <div className='text-[12px] text-gray-500 mt-[-10px]'>ไฟล์ที่รองรับ .jpg .png ขนาดไม่เกิน 2MB</div>
            </div>
          </div>

        </div>
        <div className='flex justify-center'>
          <Button onClick={handleCheckSlip} disabled={isLoading} className='bg-[#2688df] text-white rounded-md mt-2 flex justify-center items-center gap-2'>
            {
              isLoading && <Spinner aria-label="Spinner button example" size="sm" className='mr-2' />
            }
            <span>ยืนยันการโอนเงิน</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

const MethodSelect = ({ selectMethod, setSelectMethod }) => {
  return (
    <div className='flex gap-3 flex-col md:flex-row '>
      <button onClick={() => setSelectMethod(PaymentMethod.slip)} className='bg-white min-w-[300px] px-5 h-[100px] rounded-lg shadow-md flex justify-between items-center cursor-pointer'>
        <div>
          <ImageNext src={'/slip.png'} width={100} height={100} alt='' />
        </div>
        <p className='min-w-[150px] font-semibold'>ยืนยันสลิปโอนเงิน</p>
        <div>
          <Radio id="slip" name="slip" value="slip" checked={selectMethod === PaymentMethod.slip} />
        </div>
      </button>
      <button onClick={() => setSelectMethod(PaymentMethod.visa)} className='bg-white min-w-[300px] px-5 h-[100px] rounded-lg shadow-md flex justify-between items-center cursor-pointer'>
        <div>
          <ImageNext src={'/mastercard.jpg'} width={60} height={100} alt='' />
        </div>
        <p className='min-w-[150px] font-semibold'>ผ่อนชำระ</p>
        <div>
          <Radio id="visa" name="visa" value="visa" checked={selectMethod === PaymentMethod.visa} />
        </div>
      </button>
    </div>
  )
}

export default SlipPaymentEbook