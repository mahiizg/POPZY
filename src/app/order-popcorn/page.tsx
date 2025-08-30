
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Popcorn, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const popcornOptions = [
  { id: 'salted-caramel', name: 'Salted Caramel', price: 350 },
  { id: 'cheddar-cheese', name: 'Cheddar Cheese', price: 300 },
  { id: 'classic-butter', name: 'Classic Butter', price: 250 },
];

const drinkOptions = [
    { id: 'coke', name: 'Coke', price: 120 },
    { id: 'pepsi', name: 'Pepsi', price: 120 },
    { id: 'sprite', name: 'Sprite', price: 120 },
]

export default function OrderPopcornPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedPopcorn, setSelectedPopcorn] = useState<string | null>(null);
  const [popcornQuantity, setPopcornQuantity] = useState(1);
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const [drinkQuantity, setDrinkQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    let currentTotal = 0;
    if (selectedPopcorn) {
        const popcorn = popcornOptions.find(p => p.id === selectedPopcorn);
        if(popcorn) currentTotal += popcorn.price * popcornQuantity;
    }
    if (selectedDrink) {
        const drink = drinkOptions.find(d => d.id === selectedDrink);
        if(drink) currentTotal += drink.price * drinkQuantity;
    }
    setTotal(currentTotal);
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedPopcorn, popcornQuantity, selectedDrink, drinkQuantity]);


  const handlePlaceOrder = () => {
    if (!selectedPopcorn && !selectedDrink) {
      toast({
        title: 'Empty Cart',
        description: 'Please select an item to order.',
        variant: 'destructive',
      });
      return;
    }

    const query = new URLSearchParams();
    if (selectedPopcorn) {
        query.append('popcornId', selectedPopcorn);
        query.append('popcornQty', popcornQuantity.toString());
    }
    if(selectedDrink) {
        query.append('drinkId', selectedDrink);
        query.append('drinkQty', drinkQuantity.toString());
    }
    query.append('total', total.toString());
    
    router.push(`/order-details?${query.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header searchTerm="" setSearchTerm={() => {}} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Popcorn className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold">Order Popcorn & Snacks</h1>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className='lg:col-span-2'>
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Your Popcorn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedPopcorn || ""} onValueChange={setSelectedPopcorn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {popcornOptions.map((popcorn) => (
                        <div key={popcorn.id}>
                          <RadioGroupItem value={popcorn.id} id={popcorn.id} className="peer sr-only" />
                          <Label 
                            htmlFor={popcorn.id} 
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <span className="font-bold text-center">{popcorn.name}</span>
                            <span className="text-muted-foreground">₹{popcorn.price.toFixed(2)}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {selectedPopcorn && (
                      <div className="flex items-center justify-center gap-4 mt-6">
                          <Label>Quantity</Label>
                          <div className='flex items-center gap-2'>
                              <Button variant="outline" size="icon" onClick={() => setPopcornQuantity(Math.max(1, popcornQuantity - 1))}><Minus className="h-4 w-4"/></Button>
                              <Input type="number" value={popcornQuantity} readOnly className="w-16 text-center" />
                              <Button variant="outline" size="icon" onClick={() => setPopcornQuantity(popcornQuantity + 1)}><Plus className="h-4 w-4"/></Button>
                          </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className='mt-8'>
                  <CardHeader>
                    <CardTitle>Choose Your Drink</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedDrink || ""} onValueChange={setSelectedDrink} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {drinkOptions.map((drink) => (
                         <div key={drink.id}>
                          <RadioGroupItem value={drink.id} id={drink.id} className="peer sr-only" />
                          <Label 
                            htmlFor={drink.id} 
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <span className="font-bold text-center">{drink.name}</span>
                            <span className="text-muted-foreground">₹{drink.price.toFixed(2)}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {selectedDrink && (
                       <div className="flex items-center justify-center gap-4 mt-6">
                          <Label>Quantity</Label>
                          <div className='flex items-center gap-2'>
                              <Button variant="outline" size="icon" onClick={() => setDrinkQuantity(Math.max(1, drinkQuantity - 1))}><Minus className="h-4 w-4"/></Button>
                              <Input type="number" value={drinkQuantity} readOnly className="w-16 text-center" />
                              <Button variant="outline" size="icon" onClick={() => setDrinkQuantity(drinkQuantity + 1)}><Plus className="h-4 w-4"/></Button>
                          </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className='lg:col-span-1'>
                <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Your Order</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        {selectedPopcorn && popcornOptions.find(p => p.id === selectedPopcorn) &&
                           <div className='flex justify-between items-center'>
                                <div>
                                    <p className='font-semibold'>{popcornOptions.find(p => p.id === selectedPopcorn)?.name}</p>
                                    <p className='text-sm text-muted-foreground'>Quantity: {popcornQuantity}</p>
                                </div>
                                <p>₹{(popcornOptions.find(p => p.id === selectedPopcorn)!.price * popcornQuantity).toFixed(2)}</p>
                           </div>
                        }
                        {selectedDrink && drinkOptions.find(d => d.id === selectedDrink) &&
                           <div className='flex justify-between items-center'>
                                <div>
                                    <p className='font-semibold'>{drinkOptions.find(d => d.id === selectedDrink)?.name}</p>
                                    <p className='text-sm text-muted-foreground'>Quantity: {drinkQuantity}</p>
                                </div>
                                <p>₹{(drinkOptions.find(d => d.id === selectedDrink)!.price * drinkQuantity).toFixed(2)}</p>
                           </div>
                        }
                        {total === 0 && <p className='text-muted-foreground text-center py-8'>Your cart is empty.</p>}
                    </CardContent>
                    {total > 0 && 
                      <CardFooter className="p-6 flex flex-col items-stretch gap-4 border-t">
                          <div className="flex justify-between font-bold text-lg">
                              <p>Total</p>
                              <p>₹{total.toFixed(2)}</p>
                          </div>
                          <Button size="lg" onClick={handlePlaceOrder}>
                              <ShoppingCart className="mr-2 h-5 w-5" />
                              Proceed to Checkout
                          </Button>
                      </CardFooter>
                    }
                </Card>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="ghost" onClick={() => router.back()}>
                &larr; Back to Browsing
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
