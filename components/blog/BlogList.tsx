import { useDatabase } from "@nozbe/watermelondb/react";
import { useRouter } from "expo-router";
import { useState, useCallback, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { FlatList } from "@/components/ui/flat-list";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { RefreshControl } from "@/components/ui/refresh-control";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import Blog from "@/db/models/Blog";
import { SyncService } from "@/lib/sync/syncService";

const POSTS_PER_PAGE = 5;

export const BlogList = () => {
  const router = useRouter();
  const database = useDatabase();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Carregar blogs do WatermelonDB e observar mudanças
  useEffect(() => {
    // Subscribe para mudanças (observable pattern reativo)
    const blogsCollection = database.collections.get("blogs");
    const subscription = blogsCollection
      .query()
      .observe()
      .subscribe({
        next: fetchedBlogs => setBlogs(fetchedBlogs as Blog[]),
        error: error => console.error("Observable error:", error),
      });

    return () => subscription.unsubscribe();
  }, [database]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await SyncService.fullSync();
    } catch (error) {
      console.error("Error refreshing blogs:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const paginatedBlogs = blogs.slice(0, page * POSTS_PER_PAGE);
  const hasMore = paginatedBlogs.length < blogs.length;

  const renderBlogItem = ({ item }: { item: Blog }) => {
    const formattedDate = new Date(item.publishedAt).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return (
      <Pressable onPress={() => router.push(`/blog/${item.id}`)}>
        <Card size="md" variant="elevated" className="mb-4 bg-background-900">
          <VStack space="md">
            <VStack space="xs">
              <Heading size="lg" bold className="text-typography-0">
                {item.title}
              </Heading>
              {item.excerpt && (
                <Text size="sm" className="text-typography-400">
                  {item.excerpt}
                </Text>
              )}
            </VStack>

            <Text size="xs" className="text-typography-600">
              Por {item.author} • {formattedDate}
            </Text>
          </VStack>
        </Card>
      </Pressable>
    );
  };

  return (
    <VStack className="flex-1 bg-background-950">
      <VStack className="p-6 pb-4" space="md">
        <Heading size="3xl" bold className="text-typography-0">
          📚 Blogs
        </Heading>
        <Text size="md" className="text-typography-400">
          {blogs.length} artigos disponíveis
        </Text>
      </VStack>

      <FlatList
        data={paginatedBlogs}
        renderItem={renderBlogItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        ListEmptyComponent={() => (
          <VStack className="items-center py-12" space="md">
            <Text size="lg" className="text-typography-400">
              📭 Nenhum blog encontrado
            </Text>
            <Text size="sm" className="text-typography-600">
              Puxe para atualizar
            </Text>
          </VStack>
        )}
        ListFooterComponent={() =>
          hasMore ? (
            <Pressable onPress={() => setPage(page + 1)}>
              <Card size="md" variant="outline" className="bg-background-800">
                <VStack className="items-center" space="sm">
                  <Text size="sm" className="text-typography-400">
                    Carregar mais posts
                  </Text>
                </VStack>
              </Card>
            </Pressable>
          ) : null
        }
      />
    </VStack>
  );
};
