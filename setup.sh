#!/bin/sh

psql -f db/install.sql -U postgres
PGPASSWORD=qwerty psql -d Test -f db/structure.sql -U danden