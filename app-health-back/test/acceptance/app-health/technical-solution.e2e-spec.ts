/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthITechnicalSolutionRepository, appHealthMockTechnicalSolutionData, AppHealthMockTechnicalSolutionSeeder } from '@app/app-health/technical-solution';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('technical-solution', () =>
{
    let app: INestApplication;
    let technicalSolutionRepository: AppHealthITechnicalSolutionRepository;
    let technicalSolutionSeeder: AppHealthMockTechnicalSolutionSeeder;

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
                AppHealthMockTechnicalSolutionSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockTechnicalSolutionData;
        app = module.createNestApplication();
        technicalSolutionRepository = module.get<AppHealthITechnicalSolutionRepository>(AppHealthITechnicalSolutionRepository);
        technicalSolutionSeeder = module.get<AppHealthMockTechnicalSolutionSeeder>(AppHealthMockTechnicalSolutionSeeder);

        // seed mock data in memory database
        await technicalSolutionRepository.insert(technicalSolutionSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/technical-solution/create - Got 400 Conflict, TechnicalSolutionId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TechnicalSolutionId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/technical-solution/create - Got 400 Conflict, TechnicalSolutionCustomerId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                customerId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TechnicalSolutionCustomerId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/technical-solution/create - Got 400 Conflict, TechnicalSolutionName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TechnicalSolutionName must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/technical-solution/create - Got 400 Conflict, TechnicalSolutionId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TechnicalSolutionId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/technical-solution/create - Got 400 Conflict, TechnicalSolutionCustomerId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                customerId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TechnicalSolutionCustomerId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/technical-solution/create - Got 400 Conflict, TechnicalSolutionName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TechnicalSolutionName must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/technical-solution/create - Got 400 Conflict, TechnicalSolutionId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TechnicalSolutionId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/technical-solution/create - Got 400 Conflict, TechnicalSolutionCustomerId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                customerId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TechnicalSolutionCustomerId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/technical-solution/create - Got 400 Conflict, TechnicalSolutionName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TechnicalSolutionName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST app-health/technical-solution/create - Got 400 Conflict, TechnicalSolutionArchitectureDiagram is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                architectureDiagram: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TechnicalSolutionArchitectureDiagram is too large, has a maximum length of 255');
            });
    });


    test('/REST:POST app-health/technical-solution/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/technical-solutions/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solutions/paginate')
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
                    total: technicalSolutionSeeder.collectionResponse.length,
                    count: technicalSolutionSeeder.collectionResponse.length,
                    rows : technicalSolutionSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/technical-solutions/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solutions/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    technicalSolutionSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/technical-solution/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '3cd96a94-6c66-5856-85c0-2bbba890bc8d',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/technical-solution/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/technical-solution/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/find')
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

    test('/REST:POST app-health/technical-solution/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/find/9e51d54d-9c84-51c3-9d7b-9b4eacfd15a4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/technical-solution/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/technical-solution/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/technical-solution/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/technical-solution/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '9d9207ed-687a-5eca-a212-121c77ee61ec',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/technical-solution/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/technical-solution/update')
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

    test('/REST:DELETE app-health/technical-solution/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/technical-solution/delete/af0ef408-e1b0-5259-8fd5-3bbe3cc7d712')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/technical-solution/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/technical-solution/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateTechnicalSolution - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateTechnicalSolutionInput!)
                    {
                        appHealthCreateTechnicalSolution (payload:$payload)
                        {
                            id
                            customerId
                            name
                            description
                            architectureDiagram
                            proposal
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

    test('/GraphQL appHealthPaginateTechnicalSolutions', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateTechnicalSolutions (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateTechnicalSolutions).toEqual({
                    total: technicalSolutionSeeder.collectionResponse.length,
                    count: technicalSolutionSeeder.collectionResponse.length,
                    rows : technicalSolutionSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetTechnicalSolutions', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetTechnicalSolutions (query:$query)
                        {
                            id
                            name
                            description
                            architectureDiagram
                            proposal
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
                for (const [index, value] of res.body.data.appHealthGetTechnicalSolutions.entries())
                {
                    expect(technicalSolutionSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateTechnicalSolution', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateTechnicalSolutionInput!)
                    {
                        appHealthCreateTechnicalSolution (payload:$payload)
                        {
                            id
                            customerId
                            name
                            description
                            architectureDiagram
                            proposal
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
                expect(res.body.data.appHealthCreateTechnicalSolution).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindTechnicalSolution - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindTechnicalSolution (query:$query)
                        {
                            id
                            name
                            description
                            architectureDiagram
                            proposal
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
                            id: 'e114cbad-b449-54da-b266-0b3a78e1dd05',
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

    test('/GraphQL appHealthFindTechnicalSolution', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindTechnicalSolution (query:$query)
                        {
                            id
                            name
                            description
                            architectureDiagram
                            proposal
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
                expect(res.body.data.appHealthFindTechnicalSolution.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindTechnicalSolutionById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindTechnicalSolutionById (id:$id)
                        {
                            id
                            name
                            description
                            architectureDiagram
                            proposal
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4f86021f-4598-519a-b8cb-c2e3c3d39f8c',
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

    test('/GraphQL appHealthFindTechnicalSolutionById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindTechnicalSolutionById (id:$id)
                        {
                            id
                            name
                            description
                            architectureDiagram
                            proposal
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
                expect(res.body.data.appHealthFindTechnicalSolutionById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateTechnicalSolutionById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateTechnicalSolutionByIdInput!)
                    {
                        appHealthUpdateTechnicalSolutionById (payload:$payload)
                        {
                            id
                            name
                            description
                            architectureDiagram
                            proposal
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '7f84f0c4-98c5-5b59-ba4e-49123a07f31a',
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

    test('/GraphQL appHealthUpdateTechnicalSolutionById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateTechnicalSolutionByIdInput!)
                    {
                        appHealthUpdateTechnicalSolutionById (payload:$payload)
                        {
                            id
                            name
                            description
                            architectureDiagram
                            proposal
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
                expect(res.body.data.appHealthUpdateTechnicalSolutionById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateTechnicalSolutions', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateTechnicalSolutionsInput! $query: QueryStatement)
                    {
                        appHealthUpdateTechnicalSolutions (payload:$payload query:$query)
                        {
                            id
                            name
                            description
                            architectureDiagram
                            proposal
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
                expect(res.body.data.appHealthUpdateTechnicalSolutions[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteTechnicalSolutionById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteTechnicalSolutionById (id:$id)
                        {
                            id
                            name
                            description
                            architectureDiagram
                            proposal
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '98c81238-da92-5a9c-81da-0a106beebd04',
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

    test('/GraphQL appHealthDeleteTechnicalSolutionById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteTechnicalSolutionById (id:$id)
                        {
                            id
                            name
                            description
                            architectureDiagram
                            proposal
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
                expect(res.body.data.appHealthDeleteTechnicalSolutionById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await technicalSolutionRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});