/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIDatabaseRepository, appHealthMockDatabaseData, AppHealthMockDatabaseSeeder } from '@app/app-health/database';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('database', () =>
{
    let app: INestApplication;
    let databaseRepository: AppHealthIDatabaseRepository;
    let databaseSeeder: AppHealthMockDatabaseSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                AppHealthModule,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
            providers: [
                AppHealthMockDatabaseSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockDatabaseData;
        app = module.createNestApplication();
        databaseRepository = module.get<AppHealthIDatabaseRepository>(AppHealthIDatabaseRepository);
        databaseSeeder = module.get<AppHealthMockDatabaseSeeder>(AppHealthMockDatabaseSeeder);

        // seed mock data in memory database
        await databaseRepository.insert(databaseSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/database/create - Got 400 Conflict, DatabaseId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for DatabaseId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/database/create - Got 400 Conflict, DatabaseName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for DatabaseName must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/database/create - Got 400 Conflict, DatabaseType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for DatabaseType must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/database/create - Got 400 Conflict, DatabaseVersions property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                versions: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for DatabaseVersions must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/database/create - Got 400 Conflict, DatabaseId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for DatabaseId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/database/create - Got 400 Conflict, DatabaseName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for DatabaseName must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/database/create - Got 400 Conflict, DatabaseType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for DatabaseType must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/database/create - Got 400 Conflict, DatabaseVersions property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                versions: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for DatabaseVersions must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/database/create - Got 400 Conflict, DatabaseId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for DatabaseId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/database/create - Got 400 Conflict, DatabaseName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for DatabaseName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST app-health/database/create - Got 400 Conflict, DatabaseType has to be a enum option of RELATIONAL, NO_SQL, KEY_VALUE, GRAPH', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for DatabaseType has to be any of this options: RELATIONAL, NO_SQL, KEY_VALUE, GRAPH');
            });
    });

    test('/REST:POST app-health/database/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/databases/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/databases/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: databaseSeeder.collectionResponse.length,
                    count: databaseSeeder.collectionResponse.length,
                    rows : databaseSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/databases/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/databases/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    databaseSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/database/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '31d94927-ea71-597e-ae28-44d6e409f1c6',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/database/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/database/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:POST app-health/database/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/find/3f2c3df4-18a4-5e5a-b3c5-fe3e248e83b7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/database/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/database/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/database/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/database/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '9cf3f160-6b9c-5f21-a2e8-0e58ba11e5c5',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/database/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/database/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE app-health/database/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/database/delete/b7b93771-4f2a-510d-9d9f-ca4fa4d59568')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/database/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/database/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateDatabase - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateDatabaseInput!)
                    {
                        appHealthCreateDatabase (payload:$payload)
                        {
                            id
                            name
                            type
                            versions
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(mockData[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.originalError.message).toContain('already exist in database');
            });
    });

    test('/GraphQL appHealthPaginateDatabases', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateDatabases (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.appHealthPaginateDatabases).toEqual({
                    total: databaseSeeder.collectionResponse.length,
                    count: databaseSeeder.collectionResponse.length,
                    rows : databaseSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetDatabases', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetDatabases (query:$query)
                        {
                            id
                            name
                            type
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.appHealthGetDatabases.entries())
                {
                    expect(databaseSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateDatabase', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateDatabaseInput!)
                    {
                        appHealthCreateDatabase (payload:$payload)
                        {
                            id
                            name
                            type
                            versions
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.appHealthCreateDatabase).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindDatabase - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindDatabase (query:$query)
                        {
                            id
                            name
                            type
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '47d82b12-5744-5327-8549-5aa24ddd79cb',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL appHealthFindDatabase', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindDatabase (query:$query)
                        {
                            id
                            name
                            type
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.appHealthFindDatabase.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindDatabaseById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindDatabaseById (id:$id)
                        {
                            id
                            name
                            type
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6fb7ddd9-2b6f-5022-9746-e9b9c1f5ceea',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL appHealthFindDatabaseById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindDatabaseById (id:$id)
                        {
                            id
                            name
                            type
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.appHealthFindDatabaseById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateDatabaseById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateDatabaseByIdInput!)
                    {
                        appHealthUpdateDatabaseById (payload:$payload)
                        {
                            id
                            name
                            type
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '2bdca49c-a044-5598-9e04-17620b684c1d',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL appHealthUpdateDatabaseById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateDatabaseByIdInput!)
                    {
                        appHealthUpdateDatabaseById (payload:$payload)
                        {
                            id
                            name
                            type
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.appHealthUpdateDatabaseById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateDatabases', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateDatabasesInput! $query: QueryStatement)
                    {
                        appHealthUpdateDatabases (payload:$payload query:$query)
                        {
                            id
                            name
                            type
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                    query: {
                        where: {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.appHealthUpdateDatabases[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteDatabaseById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteDatabaseById (id:$id)
                        {
                            id
                            name
                            type
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bc2936bf-4a0b-51f5-8496-5c5e4033e8ab',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL appHealthDeleteDatabaseById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteDatabaseById (id:$id)
                        {
                            id
                            name
                            type
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.appHealthDeleteDatabaseById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await databaseRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});