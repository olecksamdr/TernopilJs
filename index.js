const request = require('request-promise');

const argv = require('yargs')
  .option('username', {
    alias: 'u',
    describe: 'github username'
  })
  .option('sort', {
    alias: 's',
    default: 'full_name',
    choices: ['created', 'updated', 'pushed', 'full_name'],
    describe: 'sort results'
  })
  .option('dirrection', {
    alias: 'd',
    choices: ['asc', 'desc'],
    describe: 'sort order'
  })
  .help('h')
    .alias('h', 'help')
  .argv;

const ACCESS_TOKEN = 'a12937c84d505db8a00f6aeb54665123b1e0f0de';
const API_BASE = 'https://api.github.com';

let url;
if (argv.username)
  url = API_BASE + `/users/${argv.username}/repos`;
else
  url = API_BASE + '/user/repos';

let queryParams = {
  access_token: ACCESS_TOKEN,
  sort: argv.sort,
}

if (argv.dirrection)
  queryParams.dirrection = argv.dirrection;

const options = {
  uri: url,
  qs: queryParams,
  headers: {
    'User-Agent': 'Request-Promise',
  },
  json: true,
};

request(options)
  .then((data) => {
    data.forEach(printRepository);
  })
  .catch(error => console.log(error));

  const printRepository = (repository) => {
    console.log(repository.full_name);
  };
