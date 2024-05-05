import request from 'supertest';
import app from '../app';
import { Comic } from '../models/comic';
import mongoose from 'mongoose';



beforeEach(async () => {
  await Comic.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Rotas para Comics', () => {
  it('Deve criar um novo quadrinho', async () => {
    const novoComic = {
      titulo: 'Capitão América #1',
      descricao: 'Primeiro quadrinho do Capitão América',
      data_publicacao: new Date('1941-03-01'),
      capa_url: 'http://example.com/capa.jpg',
    };

    const res = await request(app)
      .post('/comics')
      .send(novoComic)
      .expect(201);

    expect(res.body.titulo).toBe(novoComic.titulo);
  });

  it('Deve listar todos os quadrinhos', async () => {
    await Comic.create([
      {
        titulo: 'Capitão América #1',
        descricao: 'Primeiro quadrinho do Capitão América',
      },
      {
        titulo: 'Capitão América #2',
        descricao: 'Segundo quadrinho do Capitão América',
      },
    ]);

    const res = await request(app).get('/comics').expect(200);
    expect(res.body.length).toBe(2);
  });

  it('Deve obter um quadrinho por ID', async () => {
    const comic = await Comic.create({
      titulo: 'Capitão América #1',
    });

    const res = await request(app)
      .get(`/comics/${comic._id}`)
      .expect(200);

    expect(res.body.titulo).toBe('Capitão América #1');
  });

  it('Deve atualizar um quadrinho por ID', async () => {
    const comic = await Comic.create({
      titulo: 'Capitão América #1',
    });

    const res = await request(app)
      .put(`/comics/${comic._id}`)
      .send({ titulo: 'Capitão América #1 Atualizado' })
      .expect(200);

    expect(res.body.titulo).toBe('Capitão América #1 Atualizado');
  });

  it('Deve deletar um quadrinho por ID', async () => {
    const comic = await Comic.create({
      titulo: 'Capitão América #1',
    });

    const res = await request(app)
      .delete(`/comics/${comic._id}`)
      .expect(200);

    expect(res.body.message).toBe('Quadrinho deletado com sucesso');
  });
});
