"use server";

import db from "@/lib/prisma-client";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { RegisterSchema } from "@/schemas/register.schema";
import { User } from "next-auth";
import { signIn } from "@/auth";
import { z } from "zod";

// TODO: check how to redirect and authorize from here
interface ErrorOutput {
  error: { type: string; message: string };
}

interface SuccessOutput {
  res: { type: string; message: string };
}

export const register = async (
  values: z.infer<typeof RegisterSchema>,
): Promise<ErrorOutput | SuccessOutput> => {
  console.log("🔄️  start Register action..");
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: { type: "403", message: "Invalid fields" } };
  }

  const existingUser = await db.user.findFirst({
    where: { email: values.email },
  });

  if (existingUser) {
    return { error: { type: "400", message: "Email already in use" } };
  }
  //TODO: hash password!
  console.log("🔄️ before creting user");
  const newUser = await db.user.create({ data: values });

  await signIn("credentials", {
    ...newUser,

    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
  return { res: { type: "200", message: "Success" } };
};
