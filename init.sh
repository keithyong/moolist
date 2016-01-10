#!/bin/bash
npm install
psql -U postgres -a -f schema.sql
