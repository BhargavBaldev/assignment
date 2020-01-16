--create DATABASE 
--CREATE DATABASE BhargavBaldevDB;


--create table
--CREATE TABLE Individual (IndividualId int,FirstName Varchar(255),LastName Varchar(255),UserName Char(10));

--//insert records
--INSERT INTO Individual VALUES ( 6, 'Benny', 'Hill', 'hillbenny' );

--//update records
--UPDATE Individual SET UserName = 'funnyman' WHERE IndividualId = 6;

--//delete records
--DELETE FROM Individual WHERE IndividualId = 6;

--//select records
--SELECT * FROM Individual;

--//count records

--INSERT INTO Individual VALUES ( 6, 'Benny', 'Hill', 'hillbenny' );
--INSERT INTO Individual VALUES ( 8, 'dhyan', 'Hillcipher', 'jenny' );
--
----//DISTINCT
--SELECT DISTINCT(FirstName) FROM Individual;


--CREATE TABLE Publisher (IndividualId int, Company Varchar(255));
--INSERT INTO Publisher VALUES ( 6, 2000 );
--INSERT INTO Publisher VALUES ( 7, 3000 );

--inner join
--SELECT * FROM Individual
--INNER JOIN Publisher
--ON Individual.IndividualId = Publisher.IndividualId;