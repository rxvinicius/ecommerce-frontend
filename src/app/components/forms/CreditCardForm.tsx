"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  formatCardNumber,
  formatExpirationDate,
  formatCVC,
} from "@/lib/formatCard";
import { CheckoutCardFormData } from "@/lib/validations/checkout.schema";

export default function CreditCardForm() {
  const [focused, setFocused] = useState("");
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CheckoutCardFormData>();

  const { number, name, expiry, cvc } = watch();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="w-full">
        <Cards
          number={number || ""}
          name={name || ""}
          expiry={expiry || ""}
          cvc={cvc || ""}
          focused={focused}
        />
      </div>

      <div className="space-y-4">
        <div className="grid gap-1">
          <Label htmlFor="number">Número do cartão</Label>
          <Input
            type="tel"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            {...register("number", {
              onChange: (e) =>
                (e.target.value = formatCardNumber(e.target.value)),
            })}
            onFocus={() => setFocused("number")}
          />
          {errors.number && (
            <p className="text-sm text-destructive">{errors.number.message}</p>
          )}
        </div>

        <div className="grid gap-1">
          <Label htmlFor="name">Nome do titular</Label>
          <Input
            type="text"
            autoComplete="cc-name"
            placeholder="Nome completo"
            {...register("name")}
            onFocus={() => setFocused("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label htmlFor="expiry">Validade</Label>
            <Input
              type="tel"
              autoComplete="cc-exp"
              placeholder="MM/AA"
              {...register("expiry", {
                onChange: (e) =>
                  (e.target.value = formatExpirationDate(e.target.value)),
              })}
              onFocus={() => setFocused("expiry")}
            />
            {errors.expiry && (
              <p className="text-sm text-destructive">
                {errors.expiry.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              type="tel"
              autoComplete="cc-csc"
              placeholder="•••"
              {...register("cvc", {
                onChange: (e) => (e.target.value = formatCVC(e.target.value)),
              })}
              onFocus={() => setFocused("cvc")}
            />
            {errors.cvc && (
              <p className="text-sm text-destructive">{errors.cvc.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
