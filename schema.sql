drop database if exists todo;

create database todo;
\c todo;

drop table if exists todo;
create table todo (
    id          serial primary key,
    text        text,
    completed   boolean default false
);

insert into todo(text) values ('test todo 1');
insert into todo(text) values ('test todo 2');
insert into todo(text) values ('test todo 3');
insert into todo(text) values ('test todo 4');
