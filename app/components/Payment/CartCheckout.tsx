import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '@/redux/features/cart/cartSlice';
import { Modal } from '@/app/components/Modal';
import SlipPayment from './SlipPayment';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Spinner } from 'flowbite-react';

interface CartCheckoutProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  cartItems: any[];
  isAuthenticated: boolean;
}

const CartCheckout: React.FC<CartCheckoutProps> = ({
  open,
  setOpen,
  cartItems,
  isAuthenticated
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: any) => total + item.course.price, 0);
  };

  // Create a summary object of all courses in cart for the payment component
  const cartSummary = {
    _id: 'cart-checkout', // This is a placeholder ID for the cart checkout
    name: `${cartItems.length} คอร์สเรียน`,
    description: cartItems.map(item => item.course.name).join(', '),
    price: calculateTotal(),
    thumbnail: cartItems.length > 0 ? cartItems[0].course.thumbnail : { url: '/course-placeholder.png' }
  };

  const handleCheckoutSuccess = () => {
    // Clear the cart after successful checkout
    dispatch(clearCart(isAuthenticated) as any);
    setOpen(false);
    toast.success('การชำระเงินสำเร็จ');
    
    // If there's only one course, redirect to that course
    if (cartItems.length === 1) {
      router.push(`/course-access/${cartItems[0].courseId}`);
    } else {
      // Otherwise redirect to courses page
      router.push('/courses');
    }
  };

  // Allow both authenticated and non-authenticated users to see payment options
  // Authentication check will be handled during the actual payment process

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="ชำระเงิน"
      subTitle={`ยอดรวมทั้งหมด ฿${calculateTotal().toLocaleString()}`}
    >
      <div className="p-5">
        {cartItems.length > 0 ? (
          <>
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">รายการสินค้า</h3>
              <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.courseId} className="flex justify-between items-center mb-2 pb-2 border-b">
                    <span className="line-clamp-1">{item.course.name}</span>
                    <span className="font-semibold">฿{item.course.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <SlipPayment 
              product="cart" 
              data={cartSummary} 
              onCheckoutSuccess={handleCheckoutSuccess}
            />
          </>
        ) : (
          <div className="text-center py-10">
            <p>ไม่มีรายการในตะกร้า</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CartCheckout;
