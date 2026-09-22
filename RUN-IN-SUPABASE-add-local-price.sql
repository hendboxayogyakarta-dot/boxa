-- Jalankan ini di Supabase SQL Editor (database kamu sudah pernah
-- dijalankan schema.sql sebelumnya, jadi cukup tambah kolom barunya saja).

alter table products
  add column if not exists local_price numeric(12,2)
  check (local_price is null or local_price >= 0);
