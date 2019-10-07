CREATE DATABASE Employees;
USE Employees;

CREATE TABLE employee(

  id varchar(10) primary key not null,
  birth_date varchar(20),
  name varchar(255),
  gender char(2),
  hire_date varchar(50)
);

CREATE TABLE salaries(

  idEmployee varchar(10) not null,
  salary varchar(11),
  foreign key(idEmployee) references employee(id)
);

CREATE TABLE titles(

  idEmployee varchar(10) not null,
  title varchar(20) not null,
  foreign key(idEmployee) references employee(id)
);

CREATE TABLE departament(

  id varchar(4),
  name varchar(20),
  primary key(id)
);

CREATE TABLE department_manager(

  idEmployee varchar(10),
  idDepartment varchar(4),
  begin_date varchar(50),
  end_date varchar(50),
  foreign key(idEmployee) references employee(id),
  foreign key (idDepartment) references departament(id)
);

CREATE TABLE employee_department(

  idEmployee varchar(10),
  idDepartment varchar(4),
  begin_date varchar(50),
  end_date varchar(50),
  foreign key(idEmployee) references employee(id),
  foreign key (idDepartment) references departament(id)
);
