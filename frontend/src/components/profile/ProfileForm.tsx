"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserProfile, ProfileUpdateRequest } from "@/types/profile";
import { useUpdateProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  country: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  favoriteGenre: z.string().optional().nullable(),
  favoriteArtist: z.string().optional().nullable(),
  theme: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  profile: UserProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const updateProfileMutation = useUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      username: profile.username || "",
      bio: profile.bio || "",
      country: profile.country || "",
      timezone: profile.timezone || "",
      language: profile.language || "",
      favoriteGenre: profile.favoriteGenre || "",
      favoriteArtist: profile.favoriteArtist || "",
      theme: profile.theme || "",
      phoneNumber: profile.phoneNumber || "",
    },
  });

  // Reset form when profile updates
  useEffect(() => {
    form.reset({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      username: profile.username || "",
      bio: profile.bio || "",
      country: profile.country || "",
      timezone: profile.timezone || "",
      language: profile.language || "",
      favoriteGenre: profile.favoriteGenre || "",
      favoriteArtist: profile.favoriteArtist || "",
      theme: profile.theme || "",
      phoneNumber: profile.phoneNumber || "",
    });
  }, [profile, form]);

  const onSubmit = (data: ProfileFormValues) => {
    const request: ProfileUpdateRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username || "",
      bio: data.bio || "",
      country: data.country || "",
      timezone: data.timezone || "",
      language: data.language || "",
      favoriteGenre: data.favoriteGenre || "",
      favoriteArtist: data.favoriteArtist || "",
      theme: data.theme || "",
      phoneNumber: data.phoneNumber || "",
    };
    updateProfileMutation.mutate(request);
  };

  const isDirty = form.formState.isDirty;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300">
                  Email (Read Only)
                </label>
                <Input value={profile.email} disabled className="bg-muted cursor-not-allowed" />
              </div>
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your musical taste..."
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="favoriteGenre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favourite Genre</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Alternative Rock" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="favoriteArtist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favourite Artist</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Coldplay" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Country" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+123456789" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={!isDirty || updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
