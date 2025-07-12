import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Client } from 'pg';
import { PrismaService } from '../src/prisma.service';
import { execSync } from 'child_process';

let postgresContainer: StartedPostgreSqlContainer;
let postgresClient: Client;
let prismaService: PrismaService;

beforeAll(async () => {
    //connect our container 
    postgresContainer = await new PostgreSqlContainer('postgres:15').start();

    postgresClient = new Client({
        host: postgresContainer.getHost(),
        port: postgresContainer.getPort(),
        database: postgresContainer.getDatabase(),
        user: postgresContainer.getUsername(),
        password: postgresContainer.getPassword(),
    });

    await postgresClient.connect();
    const databaseUrl = `postgresql://${postgresClient.user}:${postgresClient.password}@${postgresClient.host}:${postgresClient.port}/${postgresClient.database}`;
    execSync("npx prisma migrate dev", {
        stdio: 'inherit',
        shell: 'bash', // necessário para encontrar o npx em alguns ambientes
        env: {
            ...process.env, // herda o PATH e outras variáveis
            DATABASE_URL: databaseUrl,
        },
    });
    prismaService = new PrismaService({
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
        log: ['query']

    },
    );
    console.log('connected to test db...');
})

afterAll(async () => {
    //Stop container as well as postgresClient 
    await postgresClient.end();
    await postgresContainer.stop();
    console.log('test db stopped...');
});

export { postgresClient, prismaService };
