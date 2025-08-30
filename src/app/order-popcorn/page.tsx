
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Popcorn, Ticket, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const popcornOptions = [
  { id: 'salted-caramel', name: 'Salted Caramel', price: 650 },
  { id: 'cheddar-cheese', name: 'Cheddar Cheese', price: 550 },
  { id: 'classic-butter', name: 'Classic Butter', price: 450 },
];

const drinkOptions = [
    { id: 'coke', name: 'Coke', price: 150 },
    { id: 'pepsi', name: 'Pepsi', price: 150 },
    { id: 'sprite', name: 'Sprite', price: 150 },
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

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Popcorn</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPopcorn || ""} onValueChange={setSelectedPopcorn}>
                    {popcornOptions.map((popcorn) => (
                      <div key={popcorn.id} className="flex items-center justify-between">
                        <Label htmlFor={popcorn.id} className="flex items-center gap-2 cursor-pointer">
                          <RadioGroupItem value={popcorn.id} id={popcorn.id} />
                          {popcorn.name}
                        </Label>
                        <span className="font-semibold">₹{popcorn.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </RadioGroup>
                  {selectedPopcorn && (
                    <div className="flex items-center gap-4 mt-4">
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
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Drink</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedDrink || ""} onValueChange={setSelectedDrink}>
                    {drinkOptions.map((drink) => (
                      <div key={drink.id} className="flex items-center justify-between">
                        <Label htmlFor={drink.id} className="flex items-center gap-2 cursor-pointer">
                          <RadioGroupItem value={drink.id} id={drink.id} />
                          {drink.name}
                        </Label>
                        <span className="font-semibold">₹{drink.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </RadioGroup>
                  {selectedDrink && (
                    <div className="flex items-center gap-4 mt-4">
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
            
            <Card className="mt-8">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-lg font-semibold">Total</p>
                        <p className="text-3xl font-bold">₹{total.toFixed(2)}</p>
                    </div>
                    <Button size="lg" onClick={handlePlaceOrder}>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Place Order
                    </Button>
                </CardContent>
            </Card>

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
