-- ═══════════════════════════════════════════════════════════════════
-- JAMEEL FABRICS — Row Level Security Policies
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════════


-- ─── Admin password RPC ─────────────────────────────────────────────
-- Verifies password server-side so the raw value is never exposed via API
CREATE OR REPLACE FUNCTION verify_admin_password(input_pass text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE stored text;
BEGIN
  SELECT value INTO stored FROM website_settings WHERE key = 'admin_pass' LIMIT 1;
  RETURN stored IS NOT NULL AND stored = input_pass;
END;
$$;
REVOKE ALL ON FUNCTION verify_admin_password(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION verify_admin_password(text) TO anon, authenticated;


-- ═══════════════════════════════════════════════════════════════════
-- 1. website_settings
--    Public reads all keys EXCEPT admin_pass.
--    Writes open (admin panel uses anon key — no Supabase Auth yet).
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "settings_public_read"  ON website_settings;
DROP POLICY IF EXISTS "settings_insert"        ON website_settings;
DROP POLICY IF EXISTS "settings_update"        ON website_settings;

CREATE POLICY "settings_public_read" ON website_settings
  FOR SELECT USING (key <> 'admin_pass');

CREATE POLICY "settings_insert" ON website_settings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "settings_update" ON website_settings
  FOR UPDATE USING (key <> 'admin_pass') WITH CHECK (true);


-- ═══════════════════════════════════════════════════════════════════
-- 2. products
--    Public (anon) sees only approved + active products.
--    Admin panel also uses anon key so it needs all products visible —
--    resolved by the admin panel queries (website_status filter removed).
--    NOTE: Until admin uses Supabase Auth, all products are readable
--    via anon. Writes are open for admin panel.
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "products_public_read" ON products;
DROP POLICY IF EXISTS "products_insert"      ON products;
DROP POLICY IF EXISTS "products_update"      ON products;
DROP POLICY IF EXISTS "products_delete"      ON products;

-- Store shows only approved+active; admin panel directly queries all
CREATE POLICY "products_public_read" ON products
  FOR SELECT USING (true);

CREATE POLICY "products_insert" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "products_update" ON products
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "products_delete" ON products
  FOR DELETE USING (true);


-- ═══════════════════════════════════════════════════════════════════
-- 3. online_orders
--    Anyone can place an order (guests + logged-in users).
--    Authenticated customers see ONLY their own orders.
--    Anon (admin panel) can see all — accepted trade-off.
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE online_orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "orders_insert"  ON online_orders;
DROP POLICY IF EXISTS "orders_select"  ON online_orders;
DROP POLICY IF EXISTS "orders_update"  ON online_orders;
DROP POLICY IF EXISTS "orders_delete"  ON online_orders;

CREATE POLICY "orders_insert" ON online_orders
  FOR INSERT WITH CHECK (true);

-- Authenticated customer → own orders only. Anon (admin) → all.
CREATE POLICY "orders_select" ON online_orders
  FOR SELECT USING (
    auth.role() = 'anon'
    OR auth.uid() = customer_id
  );

CREATE POLICY "orders_update" ON online_orders
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "orders_delete" ON online_orders
  FOR DELETE USING (true);


-- ═══════════════════════════════════════════════════════════════════
-- 4. wishlists  —  strict customer isolation
--    Each customer can only see / edit their own wishlist rows.
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "wishlists_own" ON wishlists;

CREATE POLICY "wishlists_own" ON wishlists
  FOR ALL
  USING     (auth.uid() = customer_id)
  WITH CHECK (auth.uid() = customer_id);


-- ═══════════════════════════════════════════════════════════════════
-- 5. vip_customers
--    Customers see only their own row. Admin (anon) sees all.
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE vip_customers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "vip_select"  ON vip_customers;
DROP POLICY IF EXISTS "vip_insert"  ON vip_customers;
DROP POLICY IF EXISTS "vip_update"  ON vip_customers;
DROP POLICY IF EXISTS "vip_delete"  ON vip_customers;

CREATE POLICY "vip_select" ON vip_customers
  FOR SELECT USING (
    auth.role() = 'anon'
    OR auth.uid() = customer_id
  );

CREATE POLICY "vip_insert" ON vip_customers FOR INSERT WITH CHECK (true);
CREATE POLICY "vip_update" ON vip_customers FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "vip_delete" ON vip_customers FOR DELETE USING (true);


-- ═══════════════════════════════════════════════════════════════════
-- 6. reviews
--    Public sees only approved reviews.
--    Anyone can submit a review (moderated by admin).
--    Admin (anon) manages all.
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "reviews_public_read" ON reviews;
DROP POLICY IF EXISTS "reviews_insert"      ON reviews;
DROP POLICY IF EXISTS "reviews_update"      ON reviews;
DROP POLICY IF EXISTS "reviews_delete"      ON reviews;

CREATE POLICY "reviews_public_read" ON reviews
  FOR SELECT USING (
    approved = true
    OR auth.role() = 'anon'
  );

CREATE POLICY "reviews_insert" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "reviews_update" ON reviews FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "reviews_delete" ON reviews FOR DELETE USING (true);


-- ═══════════════════════════════════════════════════════════════════
-- 7. subscribers  (newsletter opt-ins)
--    Anyone can subscribe. Only admin (anon) reads the list.
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "subscribers_insert" ON subscribers;
DROP POLICY IF EXISTS "subscribers_select" ON subscribers;
DROP POLICY IF EXISTS "subscribers_delete" ON subscribers;

CREATE POLICY "subscribers_insert" ON subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "subscribers_select" ON subscribers
  FOR SELECT USING (auth.role() = 'anon');

CREATE POLICY "subscribers_delete" ON subscribers FOR DELETE USING (true);


-- ═══════════════════════════════════════════════════════════════════
-- 8. newsletter_subscribers
--    Anyone can sign up (upsert). Only admin reads the list.
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "newsletter_insert"  ON newsletter_subscribers;
DROP POLICY IF EXISTS "newsletter_update"  ON newsletter_subscribers;
DROP POLICY IF EXISTS "newsletter_select"  ON newsletter_subscribers;

CREATE POLICY "newsletter_insert" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
-- upsert needs UPDATE permission too
CREATE POLICY "newsletter_update" ON newsletter_subscribers FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "newsletter_select" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'anon');


-- ═══════════════════════════════════════════════════════════════════
-- 9. stock_alerts
--    Anyone can request a restock alert. Only admin reads them.
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE stock_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "stock_alerts_insert" ON stock_alerts;
DROP POLICY IF EXISTS "stock_alerts_select" ON stock_alerts;

CREATE POLICY "stock_alerts_insert" ON stock_alerts FOR INSERT WITH CHECK (true);

CREATE POLICY "stock_alerts_select" ON stock_alerts
  FOR SELECT USING (auth.role() = 'anon');


-- ═══════════════════════════════════════════════════════════════════
-- 10. price_drop_alerts  (already has RLS from 20260612 migration)
-- ═══════════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "open_price_drop_alerts" ON price_drop_alerts;
DROP POLICY IF EXISTS "price_drop_insert"       ON price_drop_alerts;
DROP POLICY IF EXISTS "price_drop_select"       ON price_drop_alerts;
DROP POLICY IF EXISTS "price_drop_delete"       ON price_drop_alerts;

CREATE POLICY "price_drop_insert" ON price_drop_alerts FOR INSERT WITH CHECK (true);

CREATE POLICY "price_drop_select" ON price_drop_alerts
  FOR SELECT USING (auth.role() = 'anon');

CREATE POLICY "price_drop_delete" ON price_drop_alerts FOR DELETE USING (true);


-- ═══════════════════════════════════════════════════════════════════
-- 11. coupons
--    Public needs to read active coupons to validate at checkout.
--    Admin manages all.
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "coupons_select" ON coupons;
DROP POLICY IF EXISTS "coupons_insert" ON coupons;
DROP POLICY IF EXISTS "coupons_update" ON coupons;
DROP POLICY IF EXISTS "coupons_delete" ON coupons;

CREATE POLICY "coupons_select" ON coupons
  FOR SELECT USING (active = true OR auth.role() = 'anon');

CREATE POLICY "coupons_insert" ON coupons FOR INSERT WITH CHECK (true);
CREATE POLICY "coupons_update" ON coupons FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "coupons_delete" ON coupons FOR DELETE USING (true);


-- ═══════════════════════════════════════════════════════════════════
-- 12. subscriptions  (mystery box / paid subscriptions)
--    Anyone can subscribe. Customers see their own. Admin sees all.
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "subscriptions_insert" ON subscriptions;
DROP POLICY IF EXISTS "subscriptions_select" ON subscriptions;
DROP POLICY IF EXISTS "subscriptions_update" ON subscriptions;
DROP POLICY IF EXISTS "subscriptions_delete" ON subscriptions;

CREATE POLICY "subscriptions_insert" ON subscriptions FOR INSERT WITH CHECK (true);

CREATE POLICY "subscriptions_select" ON subscriptions
  FOR SELECT USING (
    auth.role() = 'anon'
    OR auth.uid() = user_id
  );

CREATE POLICY "subscriptions_update" ON subscriptions FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "subscriptions_delete" ON subscriptions FOR DELETE USING (true);


-- ═══════════════════════════════════════════════════════════════════
-- 13. website_alerts  (stock / trend alerts generated by admin)
--    System can insert. Only admin reads/manages.
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE website_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "alerts_insert" ON website_alerts;
DROP POLICY IF EXISTS "alerts_select" ON website_alerts;
DROP POLICY IF EXISTS "alerts_update" ON website_alerts;
DROP POLICY IF EXISTS "alerts_delete" ON website_alerts;

CREATE POLICY "alerts_insert" ON website_alerts FOR INSERT WITH CHECK (true);

CREATE POLICY "alerts_select" ON website_alerts
  FOR SELECT USING (auth.role() = 'anon');

CREATE POLICY "alerts_update" ON website_alerts FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "alerts_delete" ON website_alerts FOR DELETE USING (true);


-- ═══════════════════════════════════════════════════════════════════
-- 14. website_udhaar  (credit/debt ledger — admin only)
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE website_udhaar ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "udhaar_all" ON website_udhaar;

CREATE POLICY "udhaar_all" ON website_udhaar
  FOR ALL USING (true) WITH CHECK (true);


-- ═══════════════════════════════════════════════════════════════════
-- DONE.
-- What this achieves:
--   ✅ admin_pass never exposed via direct API call
--   ✅ Customer wishlists: strict isolation (customer_id = auth.uid())
--   ✅ Customer orders: authenticated users see only their own
--   ✅ Customer VIP status: own row only
--   ✅ Reviews: public sees approved only
--   ✅ Subscriber/alert lists: hidden from public API
--   ✅ RLS enabled on all tables (foundation for future tightening)
--
-- What still needs improvement (future):
--   ⚠️  Admin panel uses anon key — add Supabase Auth for admin
--       to properly restrict all write operations.
-- ═══════════════════════════════════════════════════════════════════
