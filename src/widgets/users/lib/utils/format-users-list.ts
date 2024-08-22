import { TFormattedUser, TUser } from "@/src/entities/user";

export const formatUsersList = (users: TUser[]): TFormattedUser[] => {
  return users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    subscription: user.subscription.plan.type,
    tokens: user.subscription.tokens + "TKN",
  }));
};
