export type Category = "Tech" | "Business" | "Health" | "Arts" | "Education";

export interface EventListItem {
  id: string;
  title: string;
  category: Category;
  startsAt: string; // ISO
  city: string;
  price: number; // in local currency (integer)
  thumbnail: string;
}

export interface EventDetail extends EventListItem {
  description: string;
  venue: string;
  speakers: string[];
  capacity: number;
  remaining: number;
}

export interface CheckoutRequest {
  eventId: string;
  quantity: number;
  buyer: { name: string; email: string };
}

export interface CheckoutResponse {
  success: boolean;
  reference: string;
}
