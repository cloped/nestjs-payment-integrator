import {Stripe} from 'stripe';

describe ('Authentication', () => {
    it('should connect', async () => {
        const stripe = new Stripe(process.env.STRIPE_API_KEY!!);
        const customer = await stripe.customers.create({
            email: 'customer@example.com',
        });
        expect(customer.email).toBe('customer@example.com');
    });
});