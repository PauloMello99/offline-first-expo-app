/**
 * Cache Service com TTL (Time To Live)
 *
 * Gerencia cache de timestamps de última sincronização
 * usando SecureStore do Expo para persistência confiável
 */

import * as SecureStore from "expo-secure-store";

export class CacheService {
  private static readonly CACHE_KEY = "blog_app_last_sync";
  private static readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos em ms

  /**
   * Verifica se o cache está válido (não expirado)
   */
  static isCacheValid(customTTL?: number): boolean {
    try {
      const lastSync = this.getLastSyncSync();
      if (!lastSync) return false;

      const ttl = customTTL || this.DEFAULT_TTL;
      const now = Date.now();
      const isValid = now - lastSync < ttl;

      if (!isValid) {
        console.log(`Cache expirado. Última sync: ${new Date(lastSync).toLocaleString("pt-BR")}`);
      } else {
        console.log(`Cache válido. Próxima sync em: ${Math.ceil((lastSync + ttl - now) / 1000)}s`);
      }

      return isValid;
    } catch (error) {
      console.error("Error checking cache validity:", error);
      return false;
    }
  }

  /**
   * Atualiza timestamp de última sincronização
   */
  static async updateLastSync(): Promise<void> {
    try {
      const timestamp = Date.now().toString();
      await SecureStore.setItemAsync(this.CACHE_KEY, timestamp);
      console.log(`Last sync atualizado: ${new Date().toLocaleString("pt-BR")}`);
    } catch (error) {
      console.error("Error updating last sync:", error);
    }
  }

  /**
   * Retorna timestamp da última sincronização (síncrono)
   * Usa valor em memória cacheado para evitar async
   */
  private static cacheValue: number | null = null;

  static getLastSyncSync(): number | null {
    return this.cacheValue;
  }

  /**
   * Retorna timestamp da última sincronização (assíncrono)
   */
  static async getLastSync(): Promise<number | null> {
    try {
      const value = await SecureStore.getItemAsync(this.CACHE_KEY);
      if (value) {
        this.cacheValue = parseInt(value, 10);
        return this.cacheValue;
      }
      return null;
    } catch (error) {
      console.error("Error getting last sync:", error);
      return null;
    }
  }

  /**
   * Inicializa cache ao iniciar app
   */
  static async initialize(): Promise<void> {
    await this.getLastSync();
  }

  /**
   * Limpa cache forçando próxima sincronização
   */
  static async clearCache(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(this.CACHE_KEY);
      this.cacheValue = null;
      console.log("Cache limpo com sucesso");
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  }

  /**
   * Retorna quanto tempo falta para o cache expirar (em ms)
   */
  static getTimeUntilExpiry(customTTL?: number): number {
    const lastSync = this.getLastSyncSync();
    if (!lastSync) return 0;

    const ttl = customTTL || this.DEFAULT_TTL;
    const now = Date.now();
    const timeUntilExpiry = lastSync + ttl - now;

    return Math.max(0, timeUntilExpiry);
  }
}
