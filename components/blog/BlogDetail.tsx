import { useDatabase } from "@nozbe/watermelondb/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";

import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import Blog from "@/db/models/Blog";

export const BlogDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const database = useDatabase();
  const [blog, setBlog] = useState<Blog | null>(null);

  // Carregar blog do WatermelonDB e observar mudanças
  useEffect(() => {
    if (!id) return;

    // Subscribe para mudanças (observable pattern reativo)
    const blogsCollection = database.collections.get("blogs");
    const subscription = blogsCollection.findAndObserve(id).subscribe({
      next: fetchedBlog => setBlog(fetchedBlog as Blog),
      error: error => console.error("Observable error:", error),
    });

    return () => subscription.unsubscribe();
  }, [id, database]);

  if (!blog) {
    return (
      <VStack className="flex-1 items-center justify-center p-6">
        <Text size="lg" className="text-typography-400">
          Blog não encontrado
        </Text>
        <Button onPress={() => router.back()} className="mt-4">
          <ButtonText>Voltar</ButtonText>
        </Button>
      </VStack>
    );
  }

  const formattedDate = new Date(blog.publishedAt).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ScrollView className="flex-1 bg-background-950">
      <VStack className="p-6" space="md">
        <Button variant="link" onPress={() => router.back()} size="sm">
          <ButtonText>← Voltar</ButtonText>
        </Button>

        <VStack space="lg">
          <VStack space="sm">
            <Heading size="2xl" bold className="text-typography-0">
              {blog.title}
            </Heading>
            <Text size="lg" className="text-typography-400">
              {blog.excerpt}
            </Text>
          </VStack>

          <HStack space="md" className="items-center">
            <VStack className="flex-1" space="xs">
              <Text size="sm" className="text-typography-500">
                {blog.author}
              </Text>
              <Text size="xs" className="text-typography-600">
                {blog.authorEmail}
              </Text>
            </VStack>
            <Text size="sm" className="text-typography-600">
              {formattedDate}
            </Text>
          </HStack>

          <Card size="lg" variant="elevated" className="bg-background-900">
            <VStack space="md">
              <Text size="md" className="leading-6 text-typography-200">
                {blog.content.split("\n\n").map((paragraph, index) => (
                  <Text key={index} size="md" className="mb-4 leading-6 text-typography-200">
                    {paragraph}
                  </Text>
                ))}
              </Text>
            </VStack>
          </Card>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
