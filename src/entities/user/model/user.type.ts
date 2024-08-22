export type TUser = {
  email: string;
  id: string;
  name: string;
  role: string;
  subscription: TSubscription;
};

type TSubscription = {
  tokens: number;
  plan: TPlan;
};

type TPlan = {
  type: string;
};
