import z from "zod";

export const userAddress = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  telephone: z.string().nullable(),
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  isAdmin: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  UserAddress: userAddress.nullable(),
});

export const updateUserSchema = UserSchema.omit({
  image: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  emailVerified: true,
  isAdmin: true,
  UserAddress: true,
});

export const createUserAddressSchema = userAddress
  .extend({
    userId: z.string(),
  })
  .omit({
    createdAt: true,
    updatedAt: true,
  });

export const updateUserAddressSchema = userAddress.omit({
  createdAt: true,
  updatedAt: true,
});

export type CreateUserAddress = z.infer<typeof createUserAddressSchema>;
export type UserAddress = z.infer<typeof userAddress>;
export type UserWithAddressType = z.infer<typeof UserSchema>;
export type updateUserType = z.infer<typeof updateUserSchema>;
