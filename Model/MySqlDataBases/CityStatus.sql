CREATE DATABASE CityStatus;
USE CityStatus;

CREATE TABLE Adress (
  id varchar(255) PRIMARY KEY NOT NULL,
  city varchar(255) ,
  zip varchar(255),
  street varchar(255) ,
  number varchar(255)
);

CREATE TABLE City (
  id varchar(255) PRIMARY KEY NOT NULL,
  certificate_number varchar(255) ,
  business_name varchar(255) ,
  date varchar(255) ,
  result varchar(255) ,
  sector varchar(255) ,
  FOREIGN KEY (id) REFERENCES Adress(id)
);

