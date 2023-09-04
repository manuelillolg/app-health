/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIInfrastructureServiceRepository, appHealthMockInfrastructureServiceData, AppHealthMockInfrastructureServiceSeeder } from '@app/app-health/infrastructure-service';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('infrastructure-service', () =>
{
    let app: INestApplication;
    let infrastructureServiceRepository: AppHealthIInfrastructureServiceRepository;
    let infrastructureServiceSeeder: AppHealthMockInfrastructureServiceSeeder;

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
                AppHealthMockInfrastructureServiceSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockInfrastructureServiceData;
        app = module.createNestApplication();
        infrastructureServiceRepository = module.get<AppHealthIInfrastructureServiceRepository>(AppHealthIInfrastructureServiceRepository);
        infrastructureServiceSeeder = module.get<AppHealthMockInfrastructureServiceSeeder>(AppHealthMockInfrastructureServiceSeeder);

        // seed mock data in memory database
        await infrastructureServiceRepository.insert(infrastructureServiceSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceProviderId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                providerId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceProviderId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceName must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceProviderId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                providerId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceProviderId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceName must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceProviderId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                providerId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceProviderId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST app-health/infrastructure-service/create - Got 400 Conflict, InfrastructureServiceScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for InfrastructureServiceScore is too large, has a maximum length of 6');
            });
    });


    test('/REST:POST app-health/infrastructure-service/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/infrastructure-services/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-services/paginate')
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
                    total: infrastructureServiceSeeder.collectionResponse.length,
                    count: infrastructureServiceSeeder.collectionResponse.length,
                    rows : infrastructureServiceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/infrastructure-services/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-services/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    infrastructureServiceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/infrastructure-service/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '48de4c71-d306-5a1b-ba4c-8d5809f4d47d',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/infrastructure-service/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/infrastructure-service/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/find')
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

    test('/REST:POST app-health/infrastructure-service/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/find/6ceb81e8-c7c5-5572-a98c-71df1339d078')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/infrastructure-service/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/infrastructure-service/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/infrastructure-service/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/infrastructure-service/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '298bbea7-67c7-5fea-acea-c6778385e64e',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/infrastructure-service/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/infrastructure-service/update')
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

    test('/REST:DELETE app-health/infrastructure-service/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/infrastructure-service/delete/c000a43e-c444-5e6c-bde3-286d7b251e76')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/infrastructure-service/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/infrastructure-service/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateInfrastructureService - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateInfrastructureServiceInput!)
                    {
                        appHealthCreateInfrastructureService (payload:$payload)
                        {
                            id
                            providerId
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

    test('/GraphQL appHealthPaginateInfrastructureServices', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateInfrastructureServices (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateInfrastructureServices).toEqual({
                    total: infrastructureServiceSeeder.collectionResponse.length,
                    count: infrastructureServiceSeeder.collectionResponse.length,
                    rows : infrastructureServiceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetInfrastructureServices', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetInfrastructureServices (query:$query)
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
                for (const [index, value] of res.body.data.appHealthGetInfrastructureServices.entries())
                {
                    expect(infrastructureServiceSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateInfrastructureService', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateInfrastructureServiceInput!)
                    {
                        appHealthCreateInfrastructureService (payload:$payload)
                        {
                            id
                            providerId
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
                expect(res.body.data.appHealthCreateInfrastructureService).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindInfrastructureService - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindInfrastructureService (query:$query)
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
                            id: '5c9935ef-a542-55d5-bc5a-187c3bcfbc63',
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

    test('/GraphQL appHealthFindInfrastructureService', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindInfrastructureService (query:$query)
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
                expect(res.body.data.appHealthFindInfrastructureService.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindInfrastructureServiceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindInfrastructureServiceById (id:$id)
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
                    id: '78ed41f0-79a3-56b5-afef-f7b2b05cc416',
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

    test('/GraphQL appHealthFindInfrastructureServiceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindInfrastructureServiceById (id:$id)
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
                expect(res.body.data.appHealthFindInfrastructureServiceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateInfrastructureServiceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateInfrastructureServiceByIdInput!)
                    {
                        appHealthUpdateInfrastructureServiceById (payload:$payload)
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
                        id: 'ff475048-f2bb-50be-993f-fceb83216afd',
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

    test('/GraphQL appHealthUpdateInfrastructureServiceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateInfrastructureServiceByIdInput!)
                    {
                        appHealthUpdateInfrastructureServiceById (payload:$payload)
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
                expect(res.body.data.appHealthUpdateInfrastructureServiceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateInfrastructureServices', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateInfrastructureServicesInput! $query: QueryStatement)
                    {
                        appHealthUpdateInfrastructureServices (payload:$payload query:$query)
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
                expect(res.body.data.appHealthUpdateInfrastructureServices[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteInfrastructureServiceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteInfrastructureServiceById (id:$id)
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
                    id: '77e39a40-5dd6-518b-9bcb-ad18739249b3',
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

    test('/GraphQL appHealthDeleteInfrastructureServiceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteInfrastructureServiceById (id:$id)
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
                expect(res.body.data.appHealthDeleteInfrastructureServiceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await infrastructureServiceRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});