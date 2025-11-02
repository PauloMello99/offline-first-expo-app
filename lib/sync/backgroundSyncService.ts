/**
 * Background Sync Service
 *
 * Gerencia sincronização periódica em background
 * sem bloquear a UI do usuário
 */

import { CacheService } from "@/lib/cache/cacheService";

import { SyncService } from "./syncService";

export class BackgroundSyncService {
  private static intervalId: ReturnType<typeof setInterval> | null = null;
  private static readonly SYNC_INTERVAL = 10 * 60 * 1000; // 10 minutos
  private static readonly MIN_CACHE_TTL = 5 * 60 * 1000; // 5 minutos

  /**
   * Inicia sincronização periódica em background
   */
  static startPeriodicSync(intervalMs?: number): void {
    // Limpar interval existente se houver
    this.stopPeriodicSync();

    const interval = intervalMs || this.SYNC_INTERVAL;

    console.log(`📡 Iniciando sync periódico a cada ${interval / 1000}s`);

    // Sincronizar imediatamente na primeira execução
    this.performBackgroundSync();

    // Configurar interval
    this.intervalId = setInterval(() => {
      this.performBackgroundSync();
    }, interval);
  }

  /**
   * Para sincronização periódica
   */
  static stopPeriodicSync(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("🛑 Sync periódico interrompido");
    }
  }

  /**
   * Executa sincronização em background
   */
  private static async performBackgroundSync(): Promise<void> {
    try {
      // Verificar se cache é válido
      if (CacheService.isCacheValid(this.MIN_CACHE_TTL)) {
        console.log("⏭️  Cache válido, pulando sync");
        return;
      }

      console.log("🔄 Executando sync em background...");
      const startTime = Date.now();

      // Executar sincronização
      await SyncService.fullSync();

      // Atualizar cache
      await CacheService.updateLastSync();

      const duration = Date.now() - startTime;
      console.log(`✅ Sync concluído em ${duration}ms`);
    } catch (error) {
      console.error("❌ Erro no sync background:", error);
    }
  }

  /**
   * Força sincronização imediata (ignora cache)
   */
  static async forceSync(): Promise<void> {
    console.log("🔨 Forçando sync imediato...");
    await SyncService.fullSync();
    await CacheService.updateLastSync();
    console.log("✅ Sync forçado concluído");
  }

  /**
   * Retorna status do sync periódico
   */
  static isRunning(): boolean {
    return this.intervalId !== null;
  }

  /**
   * Configurações de sync
   */
  static getConfig() {
    return {
      interval: this.SYNC_INTERVAL,
      minCacheTTL: this.MIN_CACHE_TTL,
      isRunning: this.isRunning(),
    };
  }
}
