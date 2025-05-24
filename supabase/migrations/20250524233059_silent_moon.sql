/*
  # Create server ads table

  1. New Tables
    - `server_ads`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text, not null)
      - `server_id` (text, not null)
      - `user_id` (uuid, not null, references auth.users)
      - `invite_link` (text, not null)
      - `created_at` (timestamptz, default: now())
      - `approved` (boolean, default: false)

  2. Security
    - Enable RLS on `server_ads` table
    - Add policies for:
      - Anyone can read approved ads
      - Authenticated users can read their own ads
      - Authenticated users can create ads
      - Users can only update/delete their own ads
*/

CREATE TABLE IF NOT EXISTS server_ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  server_id text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users,
  invite_link text NOT NULL,
  created_at timestamptz DEFAULT now(),
  approved boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE server_ads ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read approved ads"
  ON server_ads
  FOR SELECT
  USING (approved = true);

CREATE POLICY "Users can read own ads"
  ON server_ads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create ads"
  ON server_ads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ads"
  ON server_ads
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own ads"
  ON server_ads
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);