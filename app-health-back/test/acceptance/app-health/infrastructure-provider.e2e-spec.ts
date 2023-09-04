/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIInfrastructureProviderRepository, appHealthMockInfrastructureProviderData, AppHealthMockInfrastructureProviderSeeder } from '@app/app-health/infrastructure-provider';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('infrastructure-provider', () =>
{
    let app: INestApplication;
    let infrastructureProviderRepository: AppHealthIInfrastructureProviderRepository;
    let infrastructureProviderSeeder: AppHealthMockInfrastructureProviderSeeder;

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
                AppHealthMockInfrastructureProviderSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockInfrastructureProviderData;
        app = module.createNestApplication();
        infrastructureProviderRepository = module.get<AppHealthIInfrastructureProviderRepository>(AppHealthIInfrastructureProviderRepository);
        infrastructureProviderSeeder = module.get<AppHealthMockInfrastructureProviderSeeder>(AppHealthMockInfrastructureProviderSeeder);

        // seed mock data in memory database
        await infrastructureProviderRepository.insert(infrastructureProviderSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/infrastructure-provider/create - Got 400 Conflict, InfrastructureProviderId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureProviderId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/infrastructure-provider/create - Got 400 Conflict, InfrastructureProviderName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureProviderName must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/infrastructure-provider/create - Got 400 Conflict, InfrastructureProviderScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureProviderScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/infrastructure-provider/create - Got 400 Conflict, InfrastructureProviderId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureProviderId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/infrastructure-provider/create - Got 400 Conflict, InfrastructureProviderName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureProviderName must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/infrastructure-provider/create - Got 400 Conflict, InfrastructureProviderScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureProviderScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/infrastructure-provider/create - Got 400 Conflict, InfrastructureProviderId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureProviderId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/infrastructure-provider/create - Got 400 Conflict, InfrastructureProviderName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureProviderName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST app-health/infrastructure-provider/create - Got 400 Conflict, InfrastructureProviderScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureProviderScore is too large, has a maximum length of 6');
            });
    });


    test('/REST:POST app-health/infrastructure-provider/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/infrastructure-providers/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-providers/paginate')
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
                    total: infrastructureProviderSeeder.collectionResponse.length,
                    count: infrastructureProviderSeeder.collectionResponse.length,
                    rows : infrastructureProviderSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/infrastructure-providers/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-providers/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    infrastructureProviderSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/infrastructure-provider/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'c8b6979d-ddb0-55d9-b789-1cf4919cffa3',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/infrastructure-provider/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/infrastructure-provider/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/find')
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

    test('/REST:POST app-health/infrastructure-provider/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/find/665977bc-9081-58d1-8eda-0e140860221b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/infrastructure-provider/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-provider/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/infrastructure-provider/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/infrastructure-provider/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '4f2e7b40-fe50-5c95-b182-944191b29502',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/infrastructure-provider/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/infrastructure-provider/update')
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

    test('/REST:DELETE app-health/infrastructure-provider/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/infrastructure-provider/delete/e1e80f53-63d9-5c83-9873-d0cb45a9e1ff')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/infrastructure-provider/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/infrastructure-provider/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateInfrastructureProvider - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateInfrastructureProviderInput!)
                    {
                        appHealthCreateInfrastructureProvider (payload:$payload)
                        {
                            id
                            name
                            score
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

    test('/GraphQL appHealthPaginateInfrastructureProviders', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateInfrastructureProviders (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateInfrastructureProviders).toEqual({
                    total: infrastructureProviderSeeder.collectionResponse.length,
                    count: infrastructureProviderSeeder.collectionResponse.length,
                    rows : infrastructureProviderSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetInfrastructureProviders', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetInfrastructureProviders (query:$query)
                        {
                            id
                            name
                            score
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
                for (const [index, value] of res.body.data.appHealthGetInfrastructureProviders.entries())
                {
                    expect(infrastructureProviderSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateInfrastructureProvider', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateInfrastructureProviderInput!)
                    {
                        appHealthCreateInfrastructureProvider (payload:$payload)
                        {
                            id
                            name
                            score
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
                expect(res.body.data.appHealthCreateInfrastructureProvider).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindInfrastructureProvider - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindInfrastructureProvider (query:$query)
                        {
                            id
                            name
                            score
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
                            id: 'fc44f256-1995-51bf-89c9-259213923d19',
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

    test('/GraphQL appHealthFindInfrastructureProvider', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindInfrastructureProvider (query:$query)
                        {
                            id
                            name
                            score
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
                expect(res.body.data.appHealthFindInfrastructureProvider.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindInfrastructureProviderById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindInfrastructureProviderById (id:$id)
                        {
                            id
                            name
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0fe42591-4808-54f0-aba6-ea4cefb7e523',
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

    test('/GraphQL appHealthFindInfrastructureProviderById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindInfrastructureProviderById (id:$id)
                        {
                            id
                            name
                            score
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
                expect(res.body.data.appHealthFindInfrastructureProviderById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateInfrastructureProviderById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateInfrastructureProviderByIdInput!)
                    {
                        appHealthUpdateInfrastructureProviderById (payload:$payload)
                        {
                            id
                            name
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '918496fc-a0d9-5153-8836-6bb1442e5c60',
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

    test('/GraphQL appHealthUpdateInfrastructureProviderById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateInfrastructureProviderByIdInput!)
                    {
                        appHealthUpdateInfrastructureProviderById (payload:$payload)
                        {
                            id
                            name
                            score
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
                expect(res.body.data.appHealthUpdateInfrastructureProviderById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateInfrastructureProviders', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateInfrastructureProvidersInput! $query: QueryStatement)
                    {
                        appHealthUpdateInfrastructureProviders (payload:$payload query:$query)
                        {
                            id
                            name
                            score
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
                expect(res.body.data.appHealthUpdateInfrastructureProviders[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteInfrastructureProviderById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteInfrastructureProviderById (id:$id)
                        {
                            id
                            name
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3f259852-0b56-5e12-b42a-d51652d091a2',
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

    test('/GraphQL appHealthDeleteInfrastructureProviderById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteInfrastructureProviderById (id:$id)
                        {
                            id
                            name
                            score
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
                expect(res.body.data.appHealthDeleteInfrastructureProviderById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await infrastructureProviderRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});