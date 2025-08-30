
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().regex(/^\d{10}$/, { message: 'Please enter a valid 10-digit phone number.' }),
  address: z.string().min(10, { message: 'Address must be at least 10 characters.' }),
});

export default function OrderDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
    },
  });

  const [total, setTotal] = useState('0');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const totalAmount = searchParams.get('total');
    const popcornId = searchParams.get('popcornId');
    const popcornQty = searchParams.get('popcornQty');
    const drinkId = searchParams.get('drinkId');
    const drinkQty = searchParams.get('drinkQty');
    
    let summaryText = 'Order includes: ';
    if (popcornId && popcornQty) {
        summaryText += `${popcornQty} x ${popcornId}`;
    }
    if (drinkId && drinkQty) {
        if(popcornId) summaryText += ' and ';
        summaryText += `${drinkQty} x ${drinkId}`;
    }

    setSummary(summaryText);
    if (totalAmount) {
      setTotal(totalAmount);
    }
  }, [searchParams]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
        title: 'Order Confirmed!',
        description: `Thank you, ${values.name}. Your order will be delivered to ${values.address}. Total: ₹${parseFloat(total).toFixed(2)}`,
    });
    router.push('/browse');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header searchTerm="" setSearchTerm={() => {}} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <Truck className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold">Delivery Details</h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>{summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your 10-digit phone number" type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter your full delivery address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CardFooter className="p-0 pt-6 flex-col items-stretch gap-4">
                        <div className="p-6 border rounded-lg flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold">Total Amount</p>
                                <p className="text-3xl font-bold">₹{parseFloat(total).toFixed(2)}</p>
                            </div>
                            <Button size="lg" type="submit">
                                Confirm Order
                            </Button>
                        </div>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <Button variant="ghost" onClick={() => router.back()}>
                &larr; Back to Order
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
