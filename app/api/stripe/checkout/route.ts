import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, email } = body

    // Define plan prices (in cents)
    const plans: { [key: string]: { priceId: string; name: string } } = {
      premium: {
        priceId: 'price_1Svi6NKjhcxrXZvokEeFBQY8',
        name: 'Premium - $19/month',
      },
      vip: {
        priceId: 'price_1Svi6NKjhcxrXZvokEeFBQY8',
        name: 'VIP+ - $190/year',
      },
    }

    if (!plans[plan]) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plans[plan].priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/plans`,
      customer_email: email,
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: unknown) {
    console.error('Checkout error:', error)
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
