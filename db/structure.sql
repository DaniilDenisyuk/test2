CREATE TABLE Rubric (
  Id   serial,
  Name varchar(255) NOT NULL,
  URL varchar(255)
);

ALTER TABLE Rubric ADD CONSTRAINT pkRubric PRIMARY KEY (Id);
CREATE UNIQUE INDEX akRubric ON Rubric (Name);
