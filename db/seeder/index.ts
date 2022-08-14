import { MongoClient } from 'mongodb';

async function main() {
  const client = new MongoClient('mongodb://localhost:27017/', {
    useUnifiedTopology: true,
  });
  await client.connect();
  await insertFilms(client);
  await insertComments(client);
  process.exit();
}
main();

async function insertComments(client: MongoClient): Promise<void> {
  const movies = await client
    .db('movies-DB')
    .collection('movies')
    .find({})
    .toArray();

  await client
    .db('movies-DB')
    .collection('comments')
    .insertMany([
      {
        audit: {
          createdAt: new Date().toISOString(),
          isDeleted: false,
        },
        comment: 'Nice Movie',
        movie: movies[0]['_id'],
      },
      {
        audit: {
          createdAt: new Date().toISOString(),
          isDeleted: false,
        },
        comment: 'Nice Movie',
        movie: movies[1]['_id'],
      },
      {
        audit: {
          createdAt: new Date().toISOString(),
          isDeleted: false,
        },
        comment: 'Nice Movie',
        movie: movies[2]['_id'],
      },
    ]);
}

async function insertFilms(client: MongoClient): Promise<void> {
  await client
    .db('movies-DB')
    .collection('movies')
    .insertMany([
      {
        audit: {
          createdAt: new Date().toISOString(),
          isDeleted: false,
        },
        genre: ['action', 'adventure', 'sci-fi'],
        name: 'Star Wars Episode IV A New Hope',
        slug: 'Star Wars Episode IV A New Hope'
          .toLowerCase()
          .split(' ')
          .join('-'),
        description:
          'Princess Leia gets abducted by the insidious Darth Vader. Luke Skywalker then teams up with a Jedi Knight, a pilot and two droids to free her and to save the galaxy from the violent Galactic Empire.',
        country: 'USA',
        photo:
          'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
        releaseDate: '1977-05-25',
        rating: 5,
        price: 9.99,
      },
      {
        audit: {
          createdAt: new Date().toISOString(),
          isDeleted: false,
        },
        genre: ['action', 'adventure', 'sci-fi'],
        name: 'Star Wars Episode VI Return of the Jedi',
        slug: 'Star Wars Episode VI Return of the Jedi'
          .toLowerCase()
          .split(' ')
          .join('-'),
        description:
          "After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor's trap.",
        country: 'USA',
        photo:
          'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
        releaseDate: '1983-12-25T00:00:00.000Z',
        rating: 4,
        price: 9.99,
      },
      {
        audit: {
          createdAt: new Date().toISOString(),
          isDeleted: false,
        },
        genre: ['action', 'adventure', 'sci-fi'],
        name: 'Star Wars Episode V The Empire Strikes Back',
        slug: 'Star Wars Episode V The Empire Strikes Back'
          .toLowerCase()
          .split(' ')
          .join('-'),
        description:
          'Darth Vader is adamant about turning Luke Skywalker to the dark side. Master Yoda trains Luke to become a Jedi Knight while his friends try to fend off the Imperial fleet.',
        country: 'USA',
        photo:
          'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
        releaseDate: '1980-05-21',
        rating: 4,
        price: 9.99,
      },
    ]);
}
