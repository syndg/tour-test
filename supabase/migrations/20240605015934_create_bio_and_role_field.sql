CREATE TYPE role_type AS ENUM ('Manager', 'Employee');

ALTER TABLE public.profiles
ADD COLUMN bio text NULL,
ADD COLUMN role role_type NULL;
