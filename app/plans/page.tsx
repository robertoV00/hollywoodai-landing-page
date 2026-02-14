'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import Link from 'next/link'
import { loadCheckout } from '@/app/stripe/stripePayment'
import { openLoginModal } from '@/redux/slices/modalSlice'
import { RootState, AppDispatch } from '@/redux/store'

export default function PlansPage() {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  // Map plan names to Stripe price IDs
  const priceIds: { [key: string]: string } = {
    premium: 'price_1Svi6NKjhcxrXZvokEeFBQY8',
    vip: 'price_1SxXsdKjhcxrXZvoaqKYSIt4',
  }

  const handleChoosePlan = async (planName: string) => {
    // Check if user is logged in and not a guest
    if (!user?.uid || user?.email === 'guest12345@gmail.com') {
      dispatch(openLoginModal())
      return
    }

    const planKey = planName.toLowerCase() === 'premium' ? 'premium' : 'vip'
    const priceId = priceIds[planKey]
    
    if (priceId) {
      await loadCheckout(priceId)
    } else {
      console.error('Invalid plan selected')
    }
  }

  const faqs = [
    {
      question: 'What is Hollywood AI?',
      answer: 'HollywoodAI is designed to help you get high-quality summaries of your favourite movies instantly, without breaking a sweat. With our intuitive interface and powerful features, you can easily digest any movie in just minutes instead of hours.'
    },
    {
      question: 'How much does Hollywood AI cost?',
      answer: 'Get summaries of your favourite movies on your smartphone, tablet or laptop, all for one fixed monthly or yearly fee. Plans range from free to $190 per year. No extra costs, no contracts.'
    },
    {
      question: 'What can I watch on Hollywood AI?',
      answer: 'Hollywood AI has an extensive library of feature films. Watch as much as you want, at any time that you want.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes! You can cancel your subscription at any time with no questions asked. Your access will continue until the end of your billing period.'
    },
    
  ]

  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      yearlyPrice: null,
      description: 'Perfect for getting started',
      features: [
        'Access to summaries',
        'Standard Quality Audio',
        '1 Supported Device',
        'Basic Support'
      ],
      cta: 'Current Plan',
      ctaDisabled: false,
      highlighted: false
    },
    {
      name: 'Premium',
      price: '$15',
      priceSubtext: '/month',
      yearlyPrice: '$228/year',
      description: 'Best for regular viewers',
      features: [
        'Access 100+ Summaries',
        'Higher Quality Audio',
        'License For Commercial Use',
        '2 Supported Devices',
        'Premium Support'
      ],
      cta: 'Choose Plan',
      ctaDisabled: false,
      highlighted: true
    },
    {
      name: 'VIP+',
      price: '$190',
      priceSubtext: '/year',
      yearlyPrice: '2 Months Free',
      description: 'Best value for dedicated fans',
      features: [
        'Access 100+ Summaries',
        'Highest Quality Audio',
        'License For Commercial Use',
        '3 Supported Devices',
        'Priority Support',
        'Early Access to New Features'
      ],
      cta: 'Choose Plan',
      ctaDisabled: false,
      highlighted: false
    }
  ]

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full'>
        <SearchBox />
          <div className='border-b-2 p-7 2xl:pl-48 lg:pl-10'>
            <h1 className='text-4xl font-bold mb-2'>Plans</h1>
            <p className='text-gray-500 text-baseline'>Get unlimited access to our extensive library of movie summaries.</p>
          </div>
        <div className='master-container p-8 2xl:pl-48 2xl:pr-40 lg:pl-10 lg:pr-10 sm:pr-[30px] relative'>

            <h2 className='text-[32px] font-bold mb-4'>Subscription Plans:</h2>
          {/* Pricing Cards */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 lg:w-[100%] md:w-[90%] sm:w-[90%] xs:w-[70%]'>
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-3xl border-2 p-8 flex flex-col ${
                  plan.highlighted
                    ? 'border-purple-800 bg-gradient-to-b from-purple-50 to-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 shadow-md'
                }`}
              >
                {plan.highlighted && (
                  <div className='mb-4 inline-block'>
                    <span className='bg-purple-800 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                      Most Popular
                    </span>
                  </div>
                )}

                <h2 className='text-2xl font-bold mb-2'>{plan.name}</h2>
                <p className='text-gray-600 text-sm mb-6 md:text-[14px]'>{plan.description}</p>

                <div className='mb-8'>
                  <span className='text-4xl font-bold'>{plan.price}</span>
                  {plan.priceSubtext && (
                    <span className='text-gray-600 text-sm ml-2'>{plan.priceSubtext}</span>
                  )}
                  {plan.yearlyPrice && (
                    <p className='text-gray-600 text-sm mt-2'>{plan.yearlyPrice}</p>
                  )}
                </div>

                {/* Features */}
                <ul className='mb-8 flex-grow space-y-3'>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className='flex items-start gap-3'>
                      <svg
                        className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='text-gray-700'>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleChoosePlan(plan.name)}
                  disabled={plan.ctaDisabled || (!user?.uid || user?.email === 'guest12345@gmail.com') && plan.name !== 'Basic'}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    (plan.ctaDisabled || (!user?.uid || user?.email === 'guest12345@gmail.com') && plan.name !== 'Basic')
                      ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      : plan.highlighted
                      ? 'bg-purple-800 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {(!user?.uid || user?.email === 'guest12345@gmail.com') && plan.name !== 'Basic' ? 'Account Required' : plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className='questions-container'>
            <h2 className='text-[32px] font-bold mb-6'>Frequently Asked Questions</h2>
            <div className='space-y-4'>
              {faqs.map((faq, index) => (
                <div key={index} className='border-2 rounded-3xl overflow-hidden'>
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className='w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors'
                  >
                    <h3 className='text-xl font-semibold text-left'>{faq.question}</h3>
                    <svg
                      className={`w-6 h-6 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                        expandedFAQ === index ? 'rotate-45' : ''
                      }`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 4v16m8-8H4'
                      />
                    </svg>
                  </button>
                  {expandedFAQ === index && (
                    <div className='px-6 pb-6 border-t-2 pt-4'>
                      <p className='text-gray-700'>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
