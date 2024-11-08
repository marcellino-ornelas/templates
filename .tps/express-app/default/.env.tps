PORT={{= tps.answers.port }}
CLIENT_URL=http://localhost:{{= tps.answers.port }}
NODE_ENV=development
{{{? tps.answers.database === 'mongoose'}}}
MONGO_URI=mongodb://localhost:27017/mydatabase
{{{?}}}
