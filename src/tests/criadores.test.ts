import request from 'supertest';
import app from '../app';
import { Criador } from '../models/criador';
import mongoose from 'mongoose';



beforeEach(async () => {
  await Criador.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Rotas para Criadores', () => {
  it('Deve criar um novo criador', async () => {
    const novoCriador = {
      nome: 'Stan Lee',
      funcao: 'Roteirista',
    };

    const res = await request(app)
      .post('/criadores')
      .send(novoCriador)
      .expect(201);

    expect(res.body.nome).toBe(novoCriador.nome);
  });

  it('Deve listar todos os criadores', async () => {
    await Criador.create([
      { nome: 'Stan Lee', funcao: 'Roteirista' },
      { nome: 'Jack Kirby', funcao: 'Desenhista' },
    ]);

    const res = await request(app).get('/criadores').expect(200);
    expect(res.body.length).toBe(2);
  });

  it('Deve obter um criador por ID', async () => {
    const criador = await Criador.create({
      nome: 'Stan Lee',
    });

    const res = await request(app)
      .get(`/criadores/${criador._id}`)
      .expect(200);

    expect(res.body.nome).toBe('Stan Lee');
  });

  it('Deve atualizar um criador por ID', async () => {
    const criador = await Criador.create({
      nome: 'Stan Lee',
    });

    const res = await request(app)
      .put(`/criadores/${criador._id}`)
      .send({ nome: 'Stan Lee Atualizado' })
      .expect(200);

    expect(res.body.nome).toBe('Stan Lee Atualizado');
  });

  it('Deve deletar um criador por ID', async () => {
    const criador = await Criador.create({
      nome: 'Stan Lee',
    });

    const res = await request(app)
      .delete(`/criadores/${criador._id}`)
      .expect(200);

    expect(res.body.message).toBe('Criador deletado com sucesso');
  });
});
