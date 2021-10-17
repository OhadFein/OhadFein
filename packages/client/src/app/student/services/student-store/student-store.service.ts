import { Injectable } from '@angular/core';
import { StarDto } from '@danskill/contract';

export interface StudentStore {
  stars: StarDto[];
}

@Injectable({
  providedIn: 'root'
})
export class StudentStoreService {
  private store: StudentStore = {
    stars: []
  };

  setStars(payload: StarDto[]): void {
    this.store.stars = [...this.store.stars, ...payload];
  }

  getAllStars(): StarDto[] {
    return this.store.stars;
  }

  getStarBySlug(slug: string): StarDto | null {
    return this.store.stars.find((star: StarDto) => star.slug === slug);
  }
}
