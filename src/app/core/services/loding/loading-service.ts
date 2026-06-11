import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingMap = signal<Record<string, number>>({});

  show(key: string = 'global') {
    this.loadingMap.update((current) => ({
      ...current,
      [key]: (current[key] ?? 0) + 1,
    }));
  }

  hide(key: string = 'global') {
    this.loadingMap.update((current) => {
      const currentCount = current[key] ?? 0;
      const nextCount = currentCount - 1;

      if (nextCount <= 0) {
        const { [key]: removed, ...rest } = current;
        return rest;
      }

      return {
        ...current,
        [key]: nextCount,
      };
    });
  }

  isLoading(key: string = 'global') {
    return computed(() => !!this.loadingMap()[key]);
  }
}
