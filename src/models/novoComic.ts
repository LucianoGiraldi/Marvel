import { Comic } from '../models/comic';

describe('Testes para Comics', () => {
  it('Deve criar um novo quadrinho', async () => {
    const novoComic = {
      titulo: 'Capitão América #1',
      descricao: 'Primeiro quadrinho do Capitão América',
      data_publicacao: new Date('1941-03-01'), // Adicione uma data de publicação
    };

    const resultado = await Comic.create(novoComic);
    expect(resultado.titulo).toBe('Capitão América #1');
  });
});
