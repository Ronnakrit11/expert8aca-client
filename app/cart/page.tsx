"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeFromCart, clearCart } from "../../redux/features/cart/cartSlice";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";
import { RiSecurePaymentFill } from "react-icons/ri";
import axios from "axios";
import Loader from "../components/Loader/Loader";


const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { cartItems, isLoading } = useSelector((state: any) => state.cart);
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch cart for both authenticated and unauthenticated users
    dispatch(fetchCart(isAuthenticated) as any);
  }, [dispatch, isAuthenticated]);

  const handleRemoveFromCart = (courseId: string) => {
    dispatch(removeFromCart({ courseId, isAuthenticated }) as any);
    toast.success("Item removed from cart");
  };

  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: any) => total + item.course.price, 0);
  };

  const handleClearCart = () => {
    dispatch(clearCart(isAuthenticated) as any);
    toast.success("Cart cleared");
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      // Save the cart to localStorage before redirecting
      // This way the cart will still be available after login
      router.push("/sign-in");
      return;
    }

    try {
      setLoading(true);
      // Get payment token
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/payment/token`,
        { courseId: cartItems[0].courseId, totalAmount: calculateTotal() },
        { withCredentials: true }
      );

      // Redirect to payment page
      if (data.success) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading
        title="Shopping Cart"
        description="View your cart and checkout"
        keywords="cart, checkout, payment"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={5}
        route="cart"
        setRoute={() => {}}
      />

      <div className="w-[95%] 800px:w-[92%] m-auto py-10 min-h-[70vh]">
        <div className="w-full bg-white rounded-lg p-5">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="flex items-center text-red-500 hover:text-red-700"
              >
                <HiOutlineTrash className="mr-1" size={20} />
                Clear Cart
              </button>
            )}
          </div>

          {isLoading ? (
            <Loader />
          ) : cartItems.length === 0 ? (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center">
              <Image
                src={"/empty-cart.svg"}
                alt="Empty Cart"
                width={300}
                height={300}
                className="mb-4"
              />
              <h4 className="text-xl font-medium text-gray-700">Your cart is empty</h4>
              <button
                onClick={() => router.push("/courses")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {cartItems.map((item: any) => (
                  <div
                    key={item.cartItemId}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 mb-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="w-[80px] h-[80px] mr-4 relative rounded-md overflow-hidden">
                        <Image
                          src={item.course.thumbnail?.url || "/course-placeholder.png"}
                          alt={item.course.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{item.course.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {item.course.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end mt-4 sm:mt-0">
                      <p className="text-lg font-bold">฿{item.course.price.toLocaleString()}</p>
                      <button
                        onClick={() => handleRemoveFromCart(item.courseId)}
                        className="text-red-500 hover:text-red-700 text-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>฿{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-300 my-4"></div>
                  <div className="flex justify-between font-bold text-lg mb-6">
                    <span>Total</span>
                    <span>฿{calculateTotal().toLocaleString()}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md flex items-center justify-center"
                  >
                    {loading ? (
                      "Processing..."
                    ) : (
                      <>
                        <RiSecurePaymentFill className="mr-2" size={20} />
                        Proceed to Checkout
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
