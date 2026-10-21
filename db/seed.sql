-- DirectoryKit sample data — fictional demo listings so a fresh install
-- doesn't start empty. Delete freely and add your own.

INSERT INTO categories (slug, name, description) VALUES
  ('ai-tools', 'AI Tools', 'AI assistants, generators and automation tools.'),
  ('dev-tools', 'Developer Tools', 'Tools that help developers build, test and ship software.'),
  ('design', 'Design', 'Design tools, UI kits and creative resources.'),
  ('marketing', 'Marketing', 'SEO, email, analytics and growth tools.'),
  ('productivity', 'Productivity', 'Notes, tasks and workflow tools for teams.'),
  ('finance', 'Finance', 'Invoicing, budgeting and finance tools for small businesses.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO listings (slug, name, description, website, category_id, tags, featured, status)
SELECT 'promptpilot', 'PromptPilot',
  'A demo listing: a prompt library and testing playground for LLM apps. Replace this sample data with real listings for your niche.',
  'https://example.com', id, ARRAY['ai','llm','prompts'], true, 'published'
FROM categories WHERE slug = 'ai-tools'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO listings (slug, name, description, website, category_id, tags, featured, status)
SELECT 'shipfast-ci', 'ShipFast CI',
  'A demo listing: a lightweight CI runner for small teams. Replace this sample data with real listings for your niche.',
  'https://example.com', id, ARRAY['ci','devops'], true, 'published'
FROM categories WHERE slug = 'dev-tools'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO listings (slug, name, description, website, category_id, tags, featured, status)
SELECT 'palettepro', 'PalettePro',
  'A demo listing: a color palette generator for product designers. Replace this sample data with real listings for your niche.',
  'https://example.com', id, ARRAY['color','ui'], false, 'published'
FROM categories WHERE slug = 'design'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO listings (slug, name, description, website, category_id, tags, featured, status)
SELECT 'rankradar', 'RankRadar',
  'A demo listing: a keyword rank tracker for indie sites. Replace this sample data with real listings for your niche.',
  'https://example.com', id, ARRAY['seo','analytics'], false, 'published'
FROM categories WHERE slug = 'marketing'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO listings (slug, name, description, website, category_id, tags, featured, status)
SELECT 'focusboard', 'FocusBoard',
  'A demo listing: a minimal kanban board for solo founders. Replace this sample data with real listings for your niche.',
  'https://example.com', id, ARRAY['kanban','tasks'], false, 'published'
FROM categories WHERE slug = 'productivity'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO listings (slug, name, description, website, category_id, tags, featured, status)
SELECT 'ledgerly', 'Ledgerly',
  'A demo listing: simple invoicing for freelancers. Replace this sample data with real listings for your niche.',
  'https://example.com', id, ARRAY['invoicing','freelance'], false, 'published'
FROM categories WHERE slug = 'finance'
ON CONFLICT (slug) DO NOTHING;
