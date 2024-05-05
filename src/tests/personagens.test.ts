import request from 'supertest';
import app from '../app';
import { Personagem } from '../models/personagem';
import mongoose from 'mongoose';

beforeEach(async () => {
  await Personagem.deleteMany({});
});


afterAll(async () => {
  await mongoose.disconnect();
});

describe('Rotas para Personagens', () => {
  it('Deve criar um novo personagem', async () => {
    const novoPersonagem = {
      nome: 'Homem de Ferro',
      descricao: 'O gênio, bilionário, playboy, filantropo',
      imagem_url: 'http://example.com/imagem.jpg',
    };

    const res = await request(app)
      .post('/personagens')
      .send(novoPersonagem)
      .expect(201);

    expect(res.body.nome).toBe(novoPersonagem.nome);
  });

  it('Deve listar todos os personagens', async () => {
    await Personagem.create([
      { nome: 'Homem de Ferro', descricao: 'Um herói' },
      { nome: 'Capitão América', descricao: 'Outro herói' },
    ]);

    const res = await request(app).get('/personagens').expect(200);
    expect(res.body.length).toBe(2);
  });

  it('Deve obter um personagem por ID', async () => {
    const personagem = await Personagem.create({
      nome: 'Homem de Ferro',
    });

    const res = await request(app)
      .get(`/personagens/${personagem._id}`)
      .expect(200);

    expect(res.body.nome).toBe('Homem de Ferro');
  });

  it('Deve atualizar um personagem por ID', async () => {
    const personagem = await Personagem.create({
      nome: 'Homem de Ferro',
    });

    const res = await request(app)
      .put(`/personagens/${personagem._id}`)
      .send({ nome: 'Homem de Ferro Atualizado' })
      .expect(200);

    expect(res.body.nome).toBe('Homem de Ferro Atualizado');
  });

  it('Deve deletar um personagem por ID', async () => {
    const personagem = await Personagem.create({
      nome: 'Homem de Ferro',
    });

    const res = await request(app)
      .delete(`/personagens/${personagem._id}`)
      .expect(200);

    expect(res.body.message).toBe('Personagem deletado com sucesso');
  });
});
