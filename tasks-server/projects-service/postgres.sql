CREATE DATABASE tasks;

-- Table: public.projects

-- DROP TABLE public.projects;

CREATE TABLE public.projects
(
  id character varying(255) NOT NULL,
  name character varying(255),
  "createdAt" timestamp without time zone,
  "updatedAt" timestamp without time zone,
  CONSTRAINT projects_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);