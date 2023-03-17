import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChaosService {
  constructor() {}

  roll(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }

  selectRandom<T>(source: T[]): T {
    return source[Math.floor(Math.random() * source.length)];
  }
}
