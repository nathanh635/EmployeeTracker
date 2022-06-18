INSERT INTO department (id, name)
VALUES (001, "Accounting"),
       (002, "Information Technology"),
       (003, "Software Development"),
       (004, "Business Development");
       
INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Junior Engineer", 32.71, 003),
       (002, "Junior Accountant", 28.62, 001),
       (003, "Senior Vice President", 46.87, 004),
       (004, "Senior Accountant", 34.89, 001);

       INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Algebra I", "Linear equations, inequalities, functions, and graphs", true),
       (002, "Pre-Calculus", "Polynomials, Complex Numbers, Vectors", true),
       (003, "Calculus I", "Limits, Differentiation, Derivatives", true),
       (004, "Euclidean Geometry", "Intuitively Appealing Axioms Galore", false);