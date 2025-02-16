import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      employee: Model 
    },

    seeds(server) {
      server.create('employee', { id: "1", name: 'John Doe', role: 'CEO', managerId: null, team: 'Management', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1gwnoTIVRKLLYJNMJePOJCS2AYBHhmv5kDg&s' });
      server.create('employee', { id: "2", name: 'Alice Smith', role: 'CTO', managerId: "1", team: 'Tech', image: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg' });
      server.create('employee', { id: "3", name: 'Bob Johnson', role: 'Engineering Manager', managerId: "2", team: 'Tech', image: 'https://media.istockphoto.com/id/1410538853/photo/young-man-in-the-public-park.jpg?s=612x612&w=0&k=20&c=EtRJGnNOFPJ2HniBSLWKzsL9Xf7GHinHd5y2Tx3da0E=' });
      server.create('employee', { id: "4", name: 'Carol White', role: 'HR Director', managerId: "1", team: 'Management', image: 'https://static.vecteezy.com/system/resources/previews/038/962/461/non_2x/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg' });
      server.create('employee', { id: "5", name: 'Dave Brown', role: 'Senior Engineer', managerId: "3", team: 'Tech', image: 'https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg' });
      server.create('employee', { id: "6", name: 'Eve Green', role: 'Finance Manager', managerId: "1", team: 'Finance', image: 'https://media.istockphoto.com/id/944054912/photo/expression-of-a-business-woman.jpg?s=170x170&k=20&c=pBKDXtV8rTMaWuoStYfO18Eu9g3iM9uLIZkVjgMMyq8=' });
      server.create('employee', { id: "7", name: 'Frank Adams', role: 'Product Manager', managerId: "1", team: 'Management', image: 'https://t4.ftcdn.net/jpg/03/25/73/59/360_F_325735908_TkxHU7okor9CTWHBhkGfdRumONWfIDEb.jpg' });
      server.create('employee', { id: "8", name: 'Grace Lee', role: 'Software Engineer', managerId: "3", team: 'Tech', image: 'https://burst.shopifycdn.com/photos/professional-woman.jpg?exif=0&iptc=0' });
      server.create('employee', { id: "9", name: 'Henry Wilson', role: 'UX Designer', managerId: "7", team: 'Tech', image: 'https://st.depositphotos.com/1011643/1248/i/450/depositphotos_12485614-Asian-businesswoman-with-tablet-computer.jpg' });
      server.create('employee', { id: "10", name: 'Isabel Carter', role: 'Financial Analyst', managerId: "6", team: 'Finance', image: 'https://static.vecteezy.com/system/resources/thumbnails/032/036/902/small_2x/a-smiling-middle-aged-indian-employee-in-the-office-ai-generated-photo.jpg' });
      server.create('employee', { id: "11", name: 'Jack Taylor', role: 'Marketing Lead', managerId: "4", team: 'Management', image: 'https://img.freepik.com/free-photo/elegant-man-with-folded-arms_1262-727.jpg?semt=ais_hybrid' });
      server.create('employee', { id: "12", name: 'Karen Foster', role: 'Accountant', managerId: null, team: 'Finance', image: 'https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg' });
    },
    

    routes() {
      this.namespace = 'api';

      this.get('/employees', (schema) => {
        return { employees: schema.all('employee').models };
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

      this.get('/employees/:team', (schema, request) => {
        const team = request.params.team;
        const employees = schema.where('employee', { team });
        return { employees };
      });
    }
  });
}
