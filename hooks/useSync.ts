import { useEffect } from "react";

import { CacheService } from "@/lib/cache/cacheService";
import { BackgroundSyncService } from "@/lib/sync/backgroundSyncService";
import { SyncService } from "@/lib/sync/syncService";

export const useSync = () => {
  useEffect(() => {
    const initializeSync = async () => {
      // Inicializar cache primeiro
      await CacheService.initialize();

      // Verificar se precisa de sync inicial
      if (!CacheService.isCacheValid()) {
        console.log("🔄 Cache inválido, sincronizando...");
        await SyncService.fullSync();
        await CacheService.updateLastSync();
      } else {
        console.log("✅ Cache válido, usando dados locais");
      }

      // Iniciar sync periódico em background
      BackgroundSyncService.startPeriodicSync();
    };

    initializeSync().catch(console.error);

    // Cleanup function
    return () => {
      BackgroundSyncService.stopPeriodicSync();
    };
  }, []);
};
