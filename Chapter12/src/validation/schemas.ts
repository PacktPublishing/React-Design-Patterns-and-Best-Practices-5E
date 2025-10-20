import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(255),
  bio: z.string().max(1000).optional(),
  isActive: z.boolean().optional()
});

export const updateUserSchema = createUserSchema.partial();

export const createPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  published: z.boolean().optional(),
  authorId: z.number().int().positive()
});

export const updatePostSchema = createPostSchema.partial();

type Operation = 'create' | 'update';

type SchemaMap = Record<string, { create?: z.ZodSchema; update?: z.ZodSchema }>;

const schemaMap: SchemaMap = {
  users: {
    create: createUserSchema,
    update: updateUserSchema
  },
  posts: {
    create: createPostSchema,
    update: updatePostSchema
  }
};

export const getValidationSchema = (table: string, operation: Operation) => {
  return schemaMap[table]?.[operation];
};
