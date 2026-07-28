"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertCircle } from "lucide-react";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormValues) => authService.register(data),
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      setErrorMsg(err.response?.data?.message || "Failed to register. Please try again.");
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    setErrorMsg(null);
    registerMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Enter your details to create your MusicIQ account.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle size={16} />
              <p>{errorMsg}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="firstName">First Name</label>
              <Input id="firstName" placeholder="John" {...register("firstName")} />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="lastName">Last Name</label>
              <Input id="lastName" placeholder="Doe" {...register("lastName")} />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
            <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? "Creating account..." : "Register"}
          </Button>
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
