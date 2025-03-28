export interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
  job?: string;
  createdAt: Date;
}

export interface IAccount {
  iban: string;
  userId: string;
  balance: number;
  type: TypeAccount;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBeneficiary {
  id: number;
  iban: string;
  status: string;
  userId: string;
}

export interface ITransaction {
  id: string;
  accountSenderId: string;
  accountRecipientId: string;
  credit: number;
  status: StatusTransactions;
  type: TypeTransactions;
  createdAt: Date;
  updatedAt: Date;
}

export enum TypeTransactions {
  Withdrawal = 'Withdrawal',
  Deposit = 'Deposit',
  Transfer = 'Transfer',
}

export enum StatusTransactions {
  InProgress = 'InProgress',
  Refused = 'Refused',
  Cancelled = 'Cancelled',
  Done = 'Done',
}

export enum TypeAccount {
  CurrentAccount = 'CurrentAccount',
  SavingsAccount = 'SavingsAccount',
  BusinessAccount = 'BusinessAccount',
  JointAccount = 'JointAccount',
  InvestmentAccount = 'InvestmentAccount',
  OffshoreAccount = 'OffshoreAccount',
  FixedDepositAccount = 'FixedDepositAccount',
  EscrowAccount = 'EscrowAccount',
}

export class TransactionModel {
  id?: string;
  accountSenderId: string;
  accountRecipientId: string;
  credit: number;
  status: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateUserDto = Omit<IUser, 'id' | 'createdAt'>;
export type CreateAccountDto = Omit<
  IAccount,
  'id' | 'createdAt' | 'updatedAt'
>;
export type CreateBeneficiaryDto = Omit<IBeneficiary, 'id'>;
export type CreateTransactionDto = Omit<
  ITransaction,
  'id' | 'createdAt' | 'updatedAt'
>;

export function getAccountTypeFromString(
  accountType: string,
): TypeAccount | undefined {
  return TypeAccount[accountType as keyof typeof TypeAccount];
}

export function getStatusTransactionFromString(
  statusTransaction: string,
): StatusTransactions | undefined {
  return StatusTransactions[
    statusTransaction as keyof typeof StatusTransactions
  ];
}

export function getTransactionTypeFromString(
  transactionType: string,
): TypeTransactions | undefined {
  return TypeTransactions[transactionType as keyof typeof transactionType];
}
