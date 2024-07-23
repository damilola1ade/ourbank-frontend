export interface FormValues {
  name?: string;
  cardName?: string;
  email: string;
  password: string;
  provider?: string;
}

export interface Error {
  message: string;
}

export type Item = {
  id: any;
  cardNumber: string;
  expiryDate: string;
  cardName: string;
  provider: string;
  cvv: string;
};

export interface CreditCardComponentProps {
  item: Item;
  handleDelete: () => void;
}

