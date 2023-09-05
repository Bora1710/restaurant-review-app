export class Restaurant {
  id?: string;
  name?: string;
  description?: string;
  dateOfCreation?: Date;
  reviews?: Review[];
  averageRating?: number;

  constructor(obj?: Partial<Restaurant>) {
    if (obj) {
      Object.assign(this, obj);
    } else {
      this.id = '';
      this.name = '';
      this.description = '';
      this.dateOfCreation = new Date();
      this.reviews = [];
      this.averageRating = 0;
    }
  }

  calculateAverageRating(reviews: Review[]) {
    let sum = reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0);
    let average = sum / reviews.length || 0;
    average = Math.round(average * 2) / 2;
    return average;
  }
}

export interface Review {
  id?: string;
  rating: number;
  dateOfVisit?: Date;
  comment: string;
  commentedByUserId?: string;
}
