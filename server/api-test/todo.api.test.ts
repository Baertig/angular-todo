import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { createApp } from '../src/app';

// API lifecycle test (renamed from e2e)
describe('Todo API Flow', () => {
  const app = createApp();
  let createdId: number;

  it('GET /api/v1/todos -> empty list', async () => {
    const res = await request(app).get('/api/v1/todos').expect(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/v1/todos -> create todo', async () => {
    const res = await request(app)
      .post('/api/v1/todos')
      .send({ title: 'First', description: 'Initial description' })
      .expect(201);
    expect(typeof res.body.id).toBe('number');
    expect(res.body).toMatchObject({
      title: 'First',
      description: 'Initial description',
      done: false,
      deletedAt: null
    });
    createdId = res.body.id;
  });

  it('GET /api/v1/todos -> list with one item', async () => {
    const res = await request(app).get('/api/v1/todos').expect(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].id).toBe(createdId);
  });

  it('PATCH /api/v1/todos/:id -> update title + description', async () => {
    const res = await request(app)
      .patch(`/api/v1/todos/${createdId}`)
      .send({ title: 'Updated', description: 'Updated description' })
      .expect(200);
    expect(res.body).toMatchObject({
      id: createdId,
      title: 'Updated',
      description: 'Updated description'
    });
  });

  it('DELETE /api/v1/todos/:id -> soft delete', async () => {
    const res = await request(app)
      .delete(`/api/v1/todos/${createdId}`)
      .expect(200);
    expect(res.body.id).toBe(createdId);
    expect(res.body.deletedAt).toBeTruthy();
  });

  it('GET /api/v1/todos -> empty list after delete', async () => {
    const res = await request(app).get('/api/v1/todos').expect(200);
    expect(res.body).toEqual([]);
  });
});
