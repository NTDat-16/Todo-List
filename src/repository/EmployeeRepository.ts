import { BaseRepository } from '../core/BaseRepository.js';
import { Employee } from '../schema/employee.js';
import { EmployeePosition } from '../constants/constants.js';
export class EmployeeRepository extends BaseRepository<Employee> {
    fromJSON(data: any): Employee {
        return new Employee(data.name, data.position as EmployeePosition,data.id);
    }
    updatePosition(id: string): void {
        const emp = this.findById(id);
        if (!emp) return;
        emp.setPosition(
            emp.getPosition() === 'employee' ? 'manager' : 'employee'
        );
    }
}