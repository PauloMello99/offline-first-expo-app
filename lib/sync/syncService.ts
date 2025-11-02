import database from "@/db";
import Blog from "@/db/models/Blog";
import { supabase, type Blog as SupabaseBlog } from "@/lib/config/supabase";
import { MOCK_BLOGS } from "@/lib/mocks/blogs";

export class SyncService {
  /**
   * Verifica se Supabase está configurado
   */
  private static isSupabaseConfigured(): boolean {
    const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
    return (
      url !== undefined &&
      key !== undefined &&
      url !== "https://placeholder.supabase.co" &&
      key !== "placeholder-anon-key"
    );
  }

  /**
   * Sincroniza blogs do Supabase para o WatermelonDB
   */
  static async pullFromSupabase(): Promise<void> {
    // Se Supabase não estiver configurado, usa dados mock
    if (!this.isSupabaseConfigured()) {
      console.log("Supabase not configured, using mock data");
      await this.seedMockData();
      return;
    }

    try {
      const { data: blogs, error } = await supabase
        .from("blogs")
        .select("*")
        .order("published_at", { ascending: false })
        .returns<SupabaseBlog[]>();

      if (error) {
        console.error("Error fetching blogs from Supabase:", error);
        // Fallback para dados mock quando Supabase não estiver configurado
        await this.seedMockData();
        return;
      }

      if (!blogs || blogs.length === 0) {
        console.log("No blogs found in Supabase, seeding mock data");
        await this.seedMockData();
        return;
      }

      await database.write(async () => {
        const blogsCollection = database.collections.get<Blog>("blogs");

        // Buscar todos os blogs existentes
        const existingBlogs = await blogsCollection.query().fetch();

        // Criar ou atualizar blogs
        for (const blog of blogs) {
          const existingBlog = existingBlogs.find(b => b.id === blog.id);

          if (existingBlog) {
            await existingBlog.update(record => {
              record.title = blog.title;
              record.content = blog.content;
              record.author = blog.author;
              record.authorEmail = blog.author_email;
              record.publishedAt = new Date(blog.published_at).getTime();
              record.excerpt = blog.excerpt || undefined;
              record.coverImage = blog.cover_image || undefined;
            });
          } else {
            await blogsCollection.create(record => {
              record._raw.id = blog.id;
              record.title = blog.title;
              record.content = blog.content;
              record.author = blog.author;
              record.authorEmail = blog.author_email;
              record.publishedAt = new Date(blog.published_at).getTime();
              record.excerpt = blog.excerpt || undefined;
              record.coverImage = blog.cover_image || undefined;
            });
          }
        }
      });

      console.log("Successfully synced blogs from Supabase");
    } catch (error) {
      console.error("Error in pullFromSupabase:", error);
      // Fallback para dados mock
      await this.seedMockData();
    }
  }

  /**
   * Popula o banco de dados com dados mock iniciais
   */
  static async seedMockData(): Promise<void> {
    try {
      const blogsCollection = database.collections.get<Blog>("blogs");
      const existingBlogs = await blogsCollection.query().fetch();

      // Só popula se o banco estiver vazio
      if (existingBlogs.length > 0) {
        console.log("Database already has blogs, skipping mock data");
        return;
      }

      await database.write(async () => {
        for (const blog of MOCK_BLOGS) {
          await blogsCollection.create(record => {
            record._raw.id = blog.id;
            record.title = blog.title;
            record.content = blog.content;
            record.author = blog.author;
            record.authorEmail = blog.authorEmail;
            record.publishedAt = blog.publishedAt;
            record.excerpt = blog.excerpt || undefined;
            record.coverImage = blog.coverImage || undefined;
          });
        }
      });

      console.log("Successfully seeded mock data");
    } catch (error) {
      console.error("Error seeding mock data:", error);
    }
  }

  /**
   * Sincroniza blogs do WatermelonDB para o Supabase (push changes)
   */
  static async pushToSupabase(): Promise<void> {
    try {
      const blogsCollection = database.collections.get<Blog>("blogs");
      const blogs = await blogsCollection.query().fetch();

      const blogsToSync = blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        author: blog.author,
        author_email: blog.authorEmail,
        published_at: new Date(blog.publishedAt).toISOString(),
        excerpt: blog.excerpt || null,
        cover_image: blog.coverImage || null,
      }));

      // Este é um exemplo simples - em produção, você implementaria
      // uma lógica mais sofisticada para detectar mudanças
      const { error } = await supabase.from("blogs").upsert(blogsToSync);

      if (error) {
        console.error("Error pushing blogs to Supabase:", error);
      } else {
        console.log("Successfully pushed blogs to Supabase");
      }
    } catch (error) {
      console.error("Error in pushToSupabase:", error);
    }
  }

  /**
   * Sincroniza dados bidirecionalmente
   */
  static async fullSync(): Promise<void> {
    await this.pullFromSupabase();
    // await this.pushToSupabase(); // Comentar se não precisar de push
  }
}
