module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL:
    process.env.DB_URL ||
    'dbname=d8m0ake3mv4cq0 host=ec2-54-234-44-238.compute-1.amazonaws.com port=5432 user=hinqooqwexsptt password=0ec62e8cf62cd67f86ec7077363602692b9c9986c5c4f92660e2503e8a1191aa sslmode=require',
  JWT_SECRET:
    process.env.JWT_SECRET ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwb28iLCJuYW1lIjoiSm9lIENvb2wiLCJpYXQiOjE1MTYyMzkwMjJ9.4tRh3eVlYVN5rc1b4LwujSTBhtb3Dkx4Hkbk5iE79vY',
};
