import { Injectable } from '@angular/core';
import { PracticeDto, StarDto } from '@danskill/contract';

export interface StudentStore {
  stars: StarDto[];
  practices: PracticeDto[];
}

@Injectable({
  providedIn: 'root'
})
export class StudentStoreService {
  private store: StudentStore = {
    stars: [],
    practices: []
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

  setPractices(payload: PracticeDto[]): void {
    this.store.practices = [...this.store.practices, ...payload];
  }

  getAllPractices(): PracticeDto[] {
    return this.store.practices;
  }

  getPracticeById(practiceId: string): PracticeDto | undefined {
    return this.getAllPractices().find(
      ({ _id }: { _id: unknown }) => (_id as string) === practiceId
    );
  }
}
