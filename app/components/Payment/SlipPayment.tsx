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
import { BANK_ACCOUNT_NAME, BANK_NO, BANK_NO_REPLACE, Bank } from './constant';


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal: any = withReactContent(Swal)


interface IProps {
  product: 'course' | 'ebook' | 'cart'
  data: any
  onCheckoutSuccess?: () => void
}

enum PaymentMethod {
  slip = 'slip',
  visa = 'visa'
}

const SlipPayment = ({ product, data, onCheckoutSuccess }: IProps) => {
  console.log("🚀 ~ SlipPayment ~ data:", data)
  const { data: userData, refetch } = useLoadUserQuery<any>(undefined, {});
  const [getToken, { }] = useGetTokenPaymentMutation<any>();

  const router = useRouter()
  const [token, setToken] = useState()
  const [resultQr, setResultQr] = useState('');
  const [ons, setONS] = useState(false)
  const [user, setUser] = useState<any>();
  const [refId, setRefId] = useState<string | ''>('')
  const [verifySlip, { data: orderData, error, isLoading, isError }] = useVerifySlipMutation<any>()
  const [addressInfo, setAddressInfo] = useState({
    fullname: '',
    address: '',
    phone: ''
  })
  const [selectMethod, setSelectMethod] = useState('')
  const submitRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  useEffect(() => {
    if (user && data._id) {
      getToken(data._id).then((response: any) => {
        setToken(response?.data?.token || '')
        setRefId(response?.data?.refId || '')
      })
    }
  }, [user, data])

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
          console.log("🚀 ~ handleImageUpload ~ code:", code)

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
        toast.success('ยืนยันการโอนเงินสำเร็จ')
        if (product === 'cart' && onCheckoutSuccess) {
          // For cart checkout, call the provided success callback
          onCheckoutSuccess();
        } else if (product === 'ebook') {
          refetch();
          // For single ebook, open download modal
          // setOpen(false)
          // setOpenModalDownLoad(true)
        } else {
          // For single course, redirect to course access
          const toastId = toast.loading('รอสักครู่ระบบกำลังเข้าสู่บทเรียน')
          refetch().then(() => {
            router.replace(`/course-access/${orderData.result.courseId}`)
            toast.dismiss(toastId);
          })
        }
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
    if (!addressInfo.fullname) {
      toast.error('กรุณากรอกชื่อ-นามสกุล')
      return true
    }
    if (!addressInfo.address) {
      toast.error('กรุณากรอกที่อยู่')
      return true
    }
    if (!addressInfo.phone) {
      toast.error('กรุณากรอกเบอร์โทรศัพท์')
      return true
    }

    if (addressInfo.phone && addressInfo.phone.length < 10) {
      toast.error('กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก')
      return true
    }

    if (isCheckQr && !resultQr) {
      toast.error('กรุณาอัพโหลดสลิปโอนเงิน')
      return true
    }

    return false
  }

  const handleCheckSlip = async () => {
    if (validateInput()) {
      return
    }

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

    const payload = {
      // The server expects the exact enum values from ProductType which are lowercase
      productType: product, // 'cart', 'course', or 'ebook' - these match the server's enum values
      // For cart checkout, we use a special ID to identify it's a cart checkout
      productId: product === 'cart' ? 'cart-checkout' : data._id,
      qrData: resultQr,
      addressInfo,
    }
    await verifySlip(payload)
    Swal.close()
  }

  const onPhoneNumberChange = (e) => {
    if (e.target.value.length > 10) {
      return;
    }

    setAddressInfo(prev => ({ ...prev, phone: e.target.value.replace(/[^0-9]/g, "") }));
  }

  const handleOrderPaysolution = (e: any) => {
    if (validateInput(false)) {
      return
    }

    if (user) {
      if (!token) {
        return window.alert('token payment notfound!')
      }
      if (!refId) {
        return window.alert('refId payment notfound!')
      }

      submitRef.current?.click()
    }
  };

  const returnUrl = `${window.location.origin}/course-access/${data._id}?ptoken=${token}&addressInfo=${encodeURIComponent(JSON.stringify(addressInfo))}&`
  const postBackUrl = `${process.env.NEXT_PUBLIC_SERVER_URI}/create-order-postback?payment_token=${token}&`

  return (
    <div className='text-black font-Poppins'>
      <form className="hidden" method="post" action="https://payment.paysolutions.asia/epaylink/payment.aspx">
        <input type="hidden" name="customeremail" defaultValue={userData?.user?.email} value={userData?.user?.email} />
        <input type="hidden" name="productdetail" defaultValue={data.name} value={data.name} />
        <input type="hidden" name="refno" defaultValue={refId} />
        <input type="hidden" name="merchantid" defaultValue={process.env.NEXT_PUBLIC_PAYMENT_MERCHANT_ID} />
        <input type="hidden" name="cc" defaultValue={'00'} />
        <input type="hidden" name="total" defaultValue={data.price} value={data.price} />
        <input type="hidden" name="lang" defaultValue="TH" />
        <input type="hidden" name="returnurl" defaultValue={returnUrl} value={returnUrl} />
        <input type="hidden" name="postbackurl" defaultValue={postBackUrl} value={postBackUrl} />
        <button
          className="hidden"
          ref={submitRef}
          type="submit"
        >
        </button>
      </form>

      <div className='w-full'>
        <p className='text-center font-bold text-2xl mb-[30px]'>เลือกช่องทางชำระเงิน</p>
        <MethodSelect selectMethod={selectMethod} setSelectMethod={setSelectMethod} />
      </div>
      {
        selectMethod !== '' && <hr className='my-5' />
      }
      {
        selectMethod === PaymentMethod.slip && (
          <div>
            <div className='flex gap-8 md:flex-row flex-col'>
              <div className='w-[300px]'>
                <p className='text-left text-[18px] font-semibold pb-2'>1. กรอกข้อมูล</p>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="fullname" value="ชื่อ - นามสกุล" />
                  </div>
                  <TextInput id="fullname" type="text" value={addressInfo.fullname} onChange={({ target: { value } }) => { setAddressInfo(prev => ({ ...prev, fullname: value })) }} placeholder="ชาติชาญ นามสมมุติ" required shadow />
                </div>
                <div className="mb-2 block">
                  <Label htmlFor="address" value="ที่อยู่" />
                </div>
                <Textarea id="address" placeholder="8/64 ...." value={addressInfo.address} onChange={({ target: { value } }) => { setAddressInfo(prev => ({ ...prev, address: value })) }} required rows={4} />
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="phone" value="เบอร์โทรศัพท์" />
                  </div>
                  <TextInput id="phone" type="text" value={addressInfo.phone} onChange={onPhoneNumberChange} placeholder='089xxxxxxx' required shadow />
                </div>
              </div>
              <div>
                <p className='text-left text-[18px] font-semibold'>2. ยืนยันการโอนเงิน</p>
                <div className='flex flex-col justify-center items-center gap-4 mt-5'>
                  <ImageNext alt='' src={getBankImagePath('kbank')} width={300} height={300} />
                  <p className='text-xl text-gray-700'>เลขบัญชี</p>
                  <p onClick={handleCopy} className='text-2xl px-20 py-2 bg-slate-300 flex justify-center items-center relative cursor-pointer'>{BANK_NO} <FaRegCopy className=' cursor-pointer absolute right-0 pr-3 text-3xl' /></p>
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
          </div>)
      }
      {
        selectMethod === PaymentMethod.visa && (
          <div>
            <div className='flex justify-center items-center'>
              <div className='w-[300px]'>
                <p className='text-left text-[18px] font-semibold pb-2'>1. กรอกข้อมูล</p>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="fullname" value="ชื่อ - นามสกุล" />
                  </div>
                  <TextInput id="fullname" type="text" value={addressInfo.fullname} onChange={({ target: { value } }) => { setAddressInfo(prev => ({ ...prev, fullname: value })) }} placeholder="ชาติชาญ นามสมมุติ" required shadow />
                </div>
                <div className="mb-2 block">
                  <Label htmlFor="address" value="ที่อยู่" />
                </div>
                <Textarea id="address" placeholder="8/64 ...." value={addressInfo.address} onChange={({ target: { value } }) => { setAddressInfo(prev => ({ ...prev, address: value })) }} required rows={4} />
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="phone" value="เบอร์โทรศัพท์" />
                  </div>
                  <TextInput id="phone" type="text" value={addressInfo.phone} onChange={onPhoneNumberChange} placeholder='089xxxxxxx' required shadow />
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <Button onClick={handleOrderPaysolution} className='bg-[#2688df] text-white rounded-md mt-2 flex justify-center items-center gap-2'>
                {/* <IoOpenOutline size={20} /> */}
                <span>ดำเนินการผ่อนชำระ</span>
              </Button>
            </div>
          </div>

        )
      }
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

const getBankImagePath = (bankName: Bank) => {
  switch (bankName) {
    case 'scb':
      return '/scb.webp'
    case 'kbank':
      return '/kbank-logo.png'
    case 'ktb':
      return '/ktb.jpg'
    case 'bbl':
      return '/bbl.jpg'
    default:
      return '/kbank-logo.png'
  }
}

export default SlipPayment