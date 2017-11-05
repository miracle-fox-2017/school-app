# school-app
latihan query
SELECT instructors.*, subjects.name FROM instructors INNER JOIN conjunction ON instructors.id = conjunction.teacherid INNER JOIN subjects ON conjunction.subjectid = subjects.id WHERE conjunction.teacherid = instructors.id;

SELECT S.name, instructors.name FROM(SELECT conjunction.*, subjects.name
FROM conjunction
INNER JOIN subjects
ON subjects.id = conjunction.subjectid)AS S
INNER JOIN instructors
ON S.teacherid = instructors.id;
