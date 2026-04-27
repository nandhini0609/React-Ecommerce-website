import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import './checkout-header.css';
import './checkoutPage.css';
import { formatMoney } from '../utils/money';



export function CheckOut({ cart, loadCart }) {
    const [cartItems, setCartItems] = useState(cart);
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null)
    const navigate = useNavigate();

    const loadDeliveryOptions = () => {
        return axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((reponse) => {
                setDeliveryOptions(reponse.data);
            })
    }

    const loadPaymentSummary = () => {
        return axios.get('/api/payment-summary').then((response) => {
            setPaymentSummary(response.data);
        })
    }

    const handleDelete = async (productId) => {
        await axios.delete(`/api/cart-items/${productId}`);
        setCartItems((currentCartItems) => {
            return currentCartItems.filter((cartItem) => cartItem.product.id !== productId);
        });
    }

    const handlePlaceOrder = async () => {
        await axios.post('/api/orders');
        toast.success('Order placed successfully');
        navigate('/orders');
    }

    useEffect(() => {
        loadDeliveryOptions().catch(() => {
            // Handled by global interceptor.
        })

        loadPaymentSummary().catch(() => {
            // Handled by global interceptor.
        })
    }, [])

    useEffect(() => {
        const onRetry = (event) => {
            if (event?.detail?.path === '/checkout') {
                loadCart().catch(() => {
                    // Handled by global interceptor.
                })
                loadDeliveryOptions().catch(() => {
                    // Handled by global interceptor.
                })
                loadPaymentSummary().catch(() => {
                    // Handled by global interceptor.
                })
            }
        }

        window.addEventListener('nmart-api-retry', onRetry)
        return () => {
            window.removeEventListener('nmart-api-retry', onRetry)
        }
    }, [loadCart])

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);
    return (

        <>
            <title>Checkout</title>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <span className="logo">Nmart</span>
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">{cartItems.reduce((totalQuantity, cartItem) => totalQuantity + cartItem.quantity, 0)} items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="/images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {deliveryOptions.length > 0 && cartItems.map((cartItem) => {
                            const selectedDeliverOption = deliveryOptions
                                .find((deliveryOption) => {
                                    return deliveryOption.id === cartItem.deliveryOptionId;
                                });

                            return (
                                <div className="cart-item-container" key={cartItem.id}>
                                    <div className="delivery-date">
                                        Delivery date:{dayjs(selectedDeliverOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cartItem.product.name}

                                            </div>
                                            <div className="product-price">
                                                {formatMoney(cartItem.product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <button
                                                    type="button"
                                                    className="delete-quantity-link link-primary"
                                                    onClick={async () => {
                                                        await handleDelete(cartItem.product.id);
                                                        await loadCart();
                                                        loadPaymentSummary();
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a d elivery option:
                                            </div>
                                            {deliveryOptions.map((deliveryOption) => {
                                                let priceString = 'FREE Shipping';
                                                if (deliveryOption.priceCents > 0) {
                                                    priceString = `S${formatMoney(deliveryOption.priceCents)} - Shipping`;
                                                }
                                                return (
                                                    <div key={deliveryOption.id} className="delivery-option">
                                                        <input type="radio"
                                                            checked={deliveryOption.id === cartItem.deliveryOptionId}
                                                            className="delivery-option-input"
                                                            name={`delivery-option-${deliveryOption.id}`} />
                                                        <div>
                                                            <div className="delivery-option-date">
                                                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                                            </div>
                                                            <div className="delivery-option-price">
                                                                {priceString}
                                                            </div>
                                                        </div>
                                                    </div>

                                                )

                                            })}


                                        </div>
                                    </div>
                                </div>

                            )

                        })}



                    </div>


                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>
                        {paymentSummary && (
                            <>
                                <div className="payment-summary-row">
                                    <div>Items ({paymentSummary.totalItems}):</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                                </div>

                                <div className="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                                </div>

                                <div className="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                                </div>

                                <button
                                    className="place-order-button button-primary"
                                    onClick={handlePlaceOrder}
                                >
                                    Place your order
                                </button>

                            </>

                        )}


                    </div>
                </div>
            </div >
        </>
    )
}