export interface Restaurant {
  id?: string;
  name: string;
  description: string;
  dateOfCreation?: Date;
  reviews?: Review[];
  averageRating?: number;
}

export interface Review {
  id?: string;
  rating?: number;
  dateOfVisit?: Date;
  comment: string;
  commentedByUserId?: string;
}
