
import { createServer, Model, Response } from 'miragejs';
import { Employee } from './types';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      employee: Model
    },

    seeds(server) {
      server.create('employee', { id: "1", name: 'John Doe', role: 'CEO', managerId: null, imges: '/api/placeholder/48/48' });
      server.create('employee', { id: "2", name: 'Alice Smith', role: 'CTO', managerId: 1, imges: '/api/placeholder/48/48' });
      server.create('employee', { id: "3", name: 'Bob Johnson', role: 'Engineering Manager', managerId: 2, imges: '/api/placeholder/48/48' });
      server.create('employee', { id: "4", name: 'Carol White', role: 'HR Director', managerId: 1, imges: '/api/placeholder/48/48' });
      server.create('employee', { id: "5", name: 'Dave Brown', role: 'Senior Engineer', managerId: 3, imges: '/api/placeholder/48/48' });
    },

    routes() {
      this.namespace = 'api';

      this.get('/employees', (schema) => {
        return schema.all('employee');
      });

      this.put('/employees/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const employee = schema.find('employee', id); 
      
        if (!employee) {
          return new Response(404, {}, { error: 'Employee not found' });
        }
      
        const updatedEmployee = employee.update(attrs);
        return new Response(200, {}, { employee: updatedEmployee });
      });
      

      this.delete('/employees/:id', (schema, request) => {
        const id = request.params.id;
        const employee = schema.find('employee', id); 
      
        if (!employee) {
          return new Response(404, {}, { error: 'Employee not found' });
        }
      
        employee.destroy();
        return new Response(204);
      });
      
    }
  });
}