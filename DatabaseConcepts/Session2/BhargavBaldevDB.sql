-- //to create table individual
CREATE TABLE Individual (IndividualId int unique,FirstName Varchar(255),LastName Varchar(255),UserName Char(10));

-- // to insert data into individual
INSERT INTO Individual VALUES ( 6, 'Benny', 'Hill', 'hillbenny' );
INSERT INTO Individual VALUES ( 7, 'bkcsd', 'njask', 'dasml' );
INSERT INTO Individual VALUES ( 8, 'dhyan', 'Hillcipher', 'jenny' );

-- // to view table individual
SELECT * FROM Individual;

-- //to update individual table
UPDATE Individual SET UserName = 'funnyman' WHERE IndividualId = 6;

-- //to view individual table where firstname is distinct
SELECT DISTINCT(FirstName) FROM Individual;

-- //to create table publisher
CREATE TABLE Publisher (IndividualId int unique, Company Varchar(255));

-- //to insert data into publisher table
INSERT INTO Publisher VALUES ( 6, 2000 );
INSERT INTO Publisher VALUES ( 7, 3000 );

-- //to join(inner) two table
SELECT * FROM Individual
INNER JOIN Publisher
ON Individual.IndividualId = Publisher.IndividualId;

-- // to view table
select * from publisher;

-- //to create procedure with user input
DELIMITER $$
CREATE DEFINER=`bhargav`@`localhost` PROCEDURE `demo`(IN id INT)
BEGIN
SELECT * FROM Individual
INNER JOIN Publisher
ON Individual.IndividualId = id and Publisher.IndividualId=id;
END$$
DELIMITER ;

-- //to call a stored  procedure with user input
CALL `bhargavbaldevdb`.`demo`(6);


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `error_handler`(ID INTEGER,company varchar(50))
BEGIN 
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SELECT 'Error occured';
 INSERT INTO bhargavbaldevdb.publisher VALUES (ID,company);    
 SELECT *FROM publisher;
END$$
DELIMITER ;
CALL `bhargavbaldevdb`.`error_handler`(1,'skjdfks');


SELECT CONCAT(
     '[',
     GROUP_CONCAT(JSON_OBJECT('Id', individualId, 'FirstName', FirstName, 'LastName',LastName,'UserName',UserName)),
     ']'
 )
 FROM individual;