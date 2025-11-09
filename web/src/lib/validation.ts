import { z } from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const createProjectSchema = z.object({
  name: z.string().min(1),
});

export const createIdeaSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});
