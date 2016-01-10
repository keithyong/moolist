drop database if exists todo;

create database todo;
\c todo;

drop table if exists todo;
create table todo (
    id          serial primary key,
    text        text,
    completed   boolean default false
);
