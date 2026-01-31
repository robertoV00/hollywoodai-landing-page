'use client'

import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { useSearchParams } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '')

interface PlanDetails {
  name: string
  price: string
  billing: string
  features: string[]
}

interface CheckoutFormProps {
  plan: PlanDetails
  planKey: string
}

function CheckoutForm({ plan, planKey }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [email, setEmail] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [country, setCountry] = useState('United States')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setError('Stripe not loaded. Please try again.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planKey,
          email,
          cardholderName,
          country,
          address,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create checkout session')
        setLoading(false)
        return
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Failed to get checkout URL')
        setLoading(false)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {error && (
        <div className='bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg'>
          {error}
        </div>
      )}

      {/* Contact Information */}
      <div>
        <label className='block text-sm font-semibold mb-2'>Contact information</label>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50'
        />
      </div>

      {/* Payment Method */}
      <div>
        <label className='block text-sm font-semibold mb-3'>Payment method</label>
        <div className='space-y-3'>
          <label className='flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50'>
            <input type='radio' name='payment' defaultChecked className='mr-3' />
            <span className='text-sm font-medium'>Card</span>
          </label>
          <label className='flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50'>
            <input type='radio' name='payment' className='mr-3' />
            <span className='text-sm font-medium flex items-center gap-2'>
              <svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
                <circle cx='12' cy='12' r='10' fill='#4285F4' />
              </svg>
              Google Pay
            </span>
          </label>
        </div>
      </div>

      {/* Card Information */}
      <div>
        <label className='block text-sm font-semibold mb-2'>Card information</label>
        <div className='p-4 border border-gray-300 rounded-lg bg-white'>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Cardholder Name */}
      <div>
        <label className='block text-sm font-semibold mb-2'>Cardholder name</label>
        <input
          type='text'
          placeholder='Full name on card'
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50'
        />
      </div>

      {/* Billing Address */}
      <div>
        <label className='block text-sm font-semibold mb-2'>Billing address</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 mb-3'
        >
          <option>United States</option>
          <option>Canada</option>
          <option>United Kingdom</option>
          <option>Australia</option>
          <option>Germany</option>
          <option>France</option>
          <option>Mexico</option>
          <option>Brazil</option>
        </select>
        <input
          type='text'
          placeholder='Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50'
        />
      </div>

      {/* Save Info Checkbox */}
      <label className='flex items-start gap-3'>
        <input type='checkbox' className='mt-1' defaultChecked />
        <span className='text-sm text-gray-700'>
          Save my information for faster checkout
          <br />
          <span className='text-xs text-gray-600'>
            Pay securely at ASAP Frontend and everywhere Link is accepted.
          </span>
        </span>
      </label>

      {/* Submit Button */}
      <button
        type='submit'
        disabled={!stripe || loading}
        className='w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2'
      >
        {loading ? 'Processing...' : 'Pay with Link'}
      </button>
    </form>
  )
}

const plans: { [key: string]: PlanDetails } = {
  premium: {
    name: 'Hollywood AI - Premium',
    price: '$19.00',
    billing: 'Billed monthly',
    features: ['Access 100+ Summaries', 'Higher Quality Audio', '2 Supported Devices'],
  },
  vip: {
    name: 'Hollywood AI - VIP+',
    price: '$190',
    billing: 'Billed yearly',
    features: ['Access 100+ Summaries', 'Highest Quality Audio', '3 Supported Devices'],
  },
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const planKey = searchParams.get('plan') || 'premium'
  const plan = plans[planKey] || plans.premium

  return (
    <div className='flex'>
      <div className='w-full'>
        <div className='min-h-screen bg-gradient-to-r from-teal-500 to-teal-600 p-8 flex items-center justify-center'>
          <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full'>
            {/* Left Side - Plan Summary */}
            <div className='text-white'>
              <Link
                href='/plans'
                className='inline-flex items-center gap-2 text-white hover:opacity-80 mb-6'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
                Back
              </Link>

              <h1 className='text-3xl font-bold mb-4'>Subscribe to {plan.name}</h1>

              <div className='bg-white/20 rounded-lg p-6 mb-6'>
                <div className='flex justify-between items-start mb-4'>
                  <div>
                    <h2 className='text-lg font-semibold'>{plan.name}</h2>
                    <p className='text-white/80 text-sm'>{plan.billing}</p>
                  </div>
                  <span className='text-3xl font-bold'>{plan.price}</span>
                </div>

                <div className='border-t border-white/30 pt-4 flex justify-between items-center'>
                  <span>Subtotal</span>
                  <span>{plan.price}</span>
                </div>

                <div className='border-t border-white/30 mt-4 pt-4 flex justify-between items-center font-bold text-lg'>
                  <span>Total due today</span>
                  <span>{plan.price}</span>
                </div>

                <button className='text-white/80 hover:text-white text-sm mt-4'>
                  Add promotion code
                </button>
              </div>

              <div className='space-y-2'>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className='flex items-start gap-2'>
                    <svg className='w-5 h-5 text-green-300 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                    <span className='text-sm'>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Checkout Form */}
            <div className='bg-white rounded-lg p-8 shadow-lg'>
              <h2 className='text-2xl font-bold mb-6'>Payment details</h2>

              <Elements stripe={stripePromise}>
                <CheckoutForm plan={plan} planKey={planKey} />
              </Elements>

              <div className='text-xs text-gray-600 text-center mt-6'>
                Your payment information is secure and encrypted.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
