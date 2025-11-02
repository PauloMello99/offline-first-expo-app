-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  author_email TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_author_email ON blogs(author_email);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON blogs
  FOR SELECT
  TO public
  USING (true);

-- Create policy for authenticated insert (optional for future features)
CREATE POLICY "Allow authenticated insert"
  ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy for authenticated update (optional for future features)
CREATE POLICY "Allow authenticated update"
  ON blogs
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy for authenticated delete (optional for future features)
CREATE POLICY "Allow authenticated delete"
  ON blogs
  FOR DELETE
  TO authenticated
  USING (true);

-- Create trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
