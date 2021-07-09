INSERT INTO department (name)
VALUES
('High School Band Director'),
('Middle School Band Director');

INSERT INTO role (title, salary, department_id)
VALUES
('Head Director/Manager', 80000, 1),
('Assistant Director', 60000, 2),
('Woodwind Specialist', 40000, 1),
('Brass Specialist', 40000, 2),
('Percussion Specialist', 40000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Samuel', 'Cooper', 1, 1)
('Tony', 'Johnson', 3, 2)
('Dennis', 'Morris', 2, 1)
('Monica', 'Bennett', 5, 2)
('John', 'Blackwood', 5, 2)
('Alexander', 'Collins', 6, 2)
('Lydia', 'Lee', 3, 2)
('Nora', 'Owens', 4, 2)
('Joe', 'Meredith', 6, 2)
('Elizabeth', 'Hill', 2, 1)
('Arther', 'Parson', 4, 2)
('Anne', 'Shaw', 1, 1);