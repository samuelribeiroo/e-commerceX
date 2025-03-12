/* 

CacheManager - Classe responsável apenas pelo gerenciamento de cache:

Métodos para salvar, recuperar e limpar dados em cache
Validação de tempo de expiração
Geração de chaves de cache padronizadas

*/

import { CacheableItem } from "../@types";
import { CACHE_TIME } from "../data";


export class CacheManager {
  private cacheDuration: number;

  constructor(cacheDurationInMs: number = CACHE_TIME.THREE_DAYS) {
    this.cacheDuration = cacheDurationInMs;
  }

  generateKey(prefix: string, pramams: Record<string, any>): string {
    const pramamString = Object.entries(pramams)
      .map(([key, value]) => `${key}_${value}`)
      .join("_");

    return `${prefix}_${pramamString}`;
  }

  save(key: string, data: any): void {
    try {
      const cacheItem: CacheableItem = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
      console.error(`Erro ao salvar item: ${error}`);
    }
  }

  get<T>(key: string): T | null {
    try {
      const cachedData = localStorage.getItem(key);
      if (!cachedData) return null;

      const cacheItem: CacheableItem = JSON.parse(cachedData);
      const currentTime = Date.now();

      const isExpiredCache: boolean =
        currentTime - cacheItem.timestamp > this.cacheDuration;

      isExpiredCache ? this.remove(key) : null;

      return cacheItem.data as T;
    } catch (error) {
      console.error(`Erro ao ler o cache: ${error}`);
      this.remove(key);
      return null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  cleanExpired(prefix: string): void {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(prefix)) {
          const cachedData = localStorage.getItem(key);
          if (cachedData) {
            const cacheItem: CacheableItem = JSON.parse(cachedData);
            const now = Date.now();
            if (now - cacheItem.timestamp > this.cacheDuration) {
              this.remove(key);
            }
          }
        }
      });
    } catch (error) {
      console.error('Erro ao limpar cache expirado:', error);
    }
  }

  clearAll(prefix: string): void {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(prefix)) {
          this.remove(key);
        }
      });
    } catch (error) {
      console.error('Erro ao limpar todo o cache:', error);
    }
  }
}

export const cacheManagerFactory = new CacheManager();
