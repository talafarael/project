const request=require('supertest')
const app=require('./index.js')

describe('POST /auth/login', () => {
    it('should respond with a 200 status code', async () => {
        const response = await request(app).post("/auth/login").send({ 
            email: "artemk2504@gmail.com", 
            password: "fffff" 
          })
          expect(response.statusCode).toBe(200)// Перевірка очікуваного статусу коду відповіді
    });
});