// src/pages/store/CheckoutPage.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

const cartItems = [
  { name: "Tuition Fees (Minerval)", detail: "Academic Year 2023-2024 • Term 1", price: 2500.00 },
  { name: "School Uniform Pack", detail: "2x Shirts, 1x Blazer, 2x Trousers", price: 145.00 },
  { name: "STEM Textbook Set", detail: "Grade 10 Science & Mathematics", price: 85.50 },
];

const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
const processingFee = subtotal * 0.015;
const total = subtotal + processingFee;

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('mobile_money');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayment = () => {
    // Logique de paiement (API vers backend)
    console.log('Paiement avec', paymentMethod, 'Numéro:', phoneNumber);
    alert('Paiement simulé !');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
      <p className="text-muted-foreground mb-6">Complete your payment for tuition and essential school supplies.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Résumé commande */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing Fee (1.5%)</span>
                <span>${processingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="text-xs text-green-600 flex items-center gap-2">🔒 Secure SSL ENCRYPTION | PCI DSS COMPLIANT</div>
            </CardContent>
          </Card>
        </div>

        {/* Moyens de paiement */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile_money" id="mobile_money" />
                  <Label htmlFor="mobile_money" className="font-medium">Mobile Money</Label>
                  <div className="ml-auto flex gap-2 text-sm">
                    <span>Orange</span> <span>MTN</span> <span>M-Pesa</span>
                  </div>
                </div>
                {paymentMethod === 'mobile_money' && (
                  <div className="ml-6">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+243 XX XXX XXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit or Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank">Bank Transfer / Wire</Label>
                </div>
              </RadioGroup>

              <Button onClick={handlePayment} className="w-full">Confirm & Pay ${total.toFixed(2)} →</Button>
              <p className="text-xs text-center text-muted-foreground">
                By confirming, you agree to EduFirst's <a href="#" className="underline">Payment Terms</a> and authorize the transaction.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}