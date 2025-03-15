/* 

CacheManager - Classe responsável apenas pelo gerenciamento de cache.

Contém três métodos: Salvar, recuperar  e limpar dados em cache. Possui também validações de tempo de expiração e geração de chaves padronizadas.

Uma pergunta que pode vir a surgir é: Por qual razão foi implementado manualmente o caching se o Next já oferece métodos nativos?

                                                     RESPOSTA

Inicialmente, a implementação foi feita dessa forma porque eu gostaria de entender mais a fundo como o caching funciona, por isso optei por implementá-lo manualmente. Além disso, de acordo com meus estudos, essa abordagem promove algumas features que eu gostaria de manter na aplicação, tais como:  

1. Manter cache no client-side: A implementação feita nesse arquivo manter os dados localmente, salvos no browser do usuário. Diferente da abordagem do Next do qual o cache é gerenciado server-side.  
2. Constância entre refreshes: Persistir os dados a cada refresh, em vez de revalidar.


Obs. No arquivo 'src\app\categories\[id]\page.tsx' a feature do Next Caching é usado por ser um componente server component.

*/

import { CacheableItem } from "../@types";
import { CACHE_TIME } from "../data";

export class CacheManager {
  private cacheDuration: number;

  constructor(cacheDurationInMs: number = CACHE_TIME.THREE_DAYS) {
    this.cacheDuration = cacheDurationInMs;
  }

  generateKey(prefix: string, params: Record<string, any>): string {
    
    const generateValidParam: string[] = Object.entries(params)
    .map(([key, value]) => `${key}_${value}`);
    
    const pramamString = generateValidParam.join("_");

    return `${prefix}_${pramamString}`;

    // Objeto -> converte pra array -> mapeia e devolve uma string. 
    // Útil para gerar chaves únicas com base em um prefixo e um conjunto par chave valor.
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
      Object.keys(localStorage).forEach((key) => {
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
      console.error("Erro ao limpar cache expirado:", error);
    }
  }

  clearAll(prefix: string): void {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(prefix)) {
          this.remove(key);
        }
      });
    } catch (error) {
      console.error("Erro ao limpar todo o cache:", error);
    }
  }
}

export const cacheManagerFactory = new CacheManager();
