export type TTransaction = {
  amount: number;
  created_at: string;
  id: string;
  type: keyof typeof ETransaction;
  currency: string;
};

export type TFormattedTransaction = {
  amount: React.ReactNode;
  created_at: string;
  id: string;
  type: ETransaction;
};

export enum ETransaction {
  WRITE_OFF = "Списание",
  REPLENISH = "Пополнение",
}
