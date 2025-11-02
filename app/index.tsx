import { BlogList } from "@/components/blog/BlogList";
import { useSync } from "@/hooks/useSync";

export default function HomeScreen() {
  useSync(); // Inicializa sincronização

  return <BlogList />;
}
