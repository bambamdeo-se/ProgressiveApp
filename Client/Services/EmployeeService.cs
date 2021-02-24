using Client.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Services
{
    public class EmployeeService : IEmployeeService
    {
        public static List<Employee> employeeList = new List<Employee>()
        {
           new Employee
            {
                EmployeeId = 1,
                FirstName = "loly",
                LastName = "poly",
                Email = "logy@necssolutions.com",
                DateOfBrith = new DateTime(1980, 10, 5),
                Gender = 1,
                Description = "loly details",
                Department = new Department { DepartmentId = 1, DepartmentName = "IT" },
                PhotoPath = "images/a3.jpg"
            },
            new Employee
            {
                EmployeeId = 2,
                FirstName = "jerry",
                LastName = "Galloway",
                Email = "Sam@necssolutions.com",
                DateOfBrith = new DateTime(1981, 12, 22),
                Gender = 1,
                Description = " details",
                Department = new Department { DepartmentId = 2, DepartmentName = "HR" },
                PhotoPath = "images/a6.jpg"
            },
            new Employee
            {
                EmployeeId = 3,
                FirstName = "Jimi",
                LastName = "jam",
                Email = "jam@necssolutions.com",
                DateOfBrith = new DateTime(1979, 11, 11),
                Gender = 2,
                Description = " details",
                Department = new Department { DepartmentId = 1, DepartmentName = "IT" },
                PhotoPath = "images/a7.jpg"
            },
            new Employee
            {
                EmployeeId = 3,
                FirstName = "Sara",
                LastName = "Longway",
                Email = "sara@necssolutions.com",
                DateOfBrith = new DateTime(1982, 9, 23),
                Gender = 2,
                Description = " details",
                Department = new Department { DepartmentId = 3, DepartmentName = "Payroll" },
                PhotoPath = "images/a8.jpg"
            }

    };
     
        public async Task<Employee> GetEmployee(int id)
        {
            List<Employee> employee = await Task.Run(LoadEmployees);
            return employee.Where(e => e.EmployeeId == id).FirstOrDefault();
        }
        private List<Employee> LoadEmployees()
        {
            System.Threading.Thread.Sleep(500);
            return employeeList;
        }
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            return await Task.Run(LoadEmployees);            
        }
        public async Task<Employee> UpdateEmployee(Employee upDatedEmployee)
        {
            return await Task.FromResult(upDatedEmployee);
        }
        public async Task<Employee> CreateEmployee(Employee createEmployee)
        {
            List<Employee> employee = await Task.Run(LoadEmployees);
            createEmployee.EmployeeId = employee.Max(x => x.EmployeeId)+1;
            employeeList.Add(createEmployee);
            return await Task.FromResult(createEmployee);
        }
        public async Task Delete(int id)
        {
            List<Employee> employee = await Task.Run(LoadEmployees);
            Employee  deletedEmployee = employee.Where(e => e.EmployeeId == id).FirstOrDefault();
            employeeList.Remove(deletedEmployee);
        }
    }
}
