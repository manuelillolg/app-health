/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIApplicationApiRepository, appHealthMockApplicationApiData, AppHealthMockApplicationApiSeeder } from '@app/app-health/application-api';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('application-api', () =>
{
    let app: INestApplication;
    let applicationApiRepository: AppHealthIApplicationApiRepository;
    let applicationApiSeeder: AppHealthMockApplicationApiSeeder;

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
                AppHealthMockApplicationApiSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockApplicationApiData;
        app = module.createNestApplication();
        applicationApiRepository = module.get<AppHealthIApplicationApiRepository>(AppHealthIApplicationApiRepository);
        applicationApiSeeder = module.get<AppHealthMockApplicationApiSeeder>(AppHealthMockApplicationApiSeeder);

        // seed mock data in memory database
        await applicationApiRepository.insert(applicationApiSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiApplicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiApplicationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiApiInterfaceTypeId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                apiInterfaceTypeId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiApiInterfaceTypeId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiApplicationInfrastructureServiceId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiApplicationInfrastructureServiceId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiApplicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiApplicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiApiInterfaceTypeId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                apiInterfaceTypeId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiApiInterfaceTypeId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiApplicationInfrastructureServiceId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiApplicationInfrastructureServiceId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiApiInterfaceTypeId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                apiInterfaceTypeId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiApiInterfaceTypeId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiApplicationInfrastructureServiceId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiApplicationInfrastructureServiceId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiScore is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiRequestsPerDay is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                requestsPerDay: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationApiRequestsPerDay is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 400 Conflict, ApplicationApiRequestsPerDay must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                requestsPerDay: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationApiRequestsPerDay must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST app-health/application-api/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/application-apis/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-apis/paginate')
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
                    total: applicationApiSeeder.collectionResponse.length,
                    count: applicationApiSeeder.collectionResponse.length,
                    rows : applicationApiSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/application-apis/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-apis/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    applicationApiSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/application-api/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '7d454752-62a3-5f16-a8de-bfdde2a9ba00',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/application-api/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/application-api/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/find')
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

    test('/REST:POST app-health/application-api/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/find/b4f131e3-461d-552a-b5ec-c95e38b8d52d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/application-api/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-api/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/application-api/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-api/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'dad774bb-2084-5024-993f-bb9127ca1442',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/application-api/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-api/update')
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

    test('/REST:DELETE app-health/application-api/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-api/delete/5d455e85-32ab-5db3-abef-a3403c4fe2fb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/application-api/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-api/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateApplicationApi - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationApiInput!)
                    {
                        appHealthCreateApplicationApi (payload:$payload)
                        {
                            id
                            applicationId
                            apiInterfaceTypeId
                            score
                            documentations
                            requestsPerDay
                            applicationInfrastructureServiceId
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

    test('/GraphQL appHealthPaginateApplicationApis', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateApplicationApis (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateApplicationApis).toEqual({
                    total: applicationApiSeeder.collectionResponse.length,
                    count: applicationApiSeeder.collectionResponse.length,
                    rows : applicationApiSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetApplicationApis', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetApplicationApis (query:$query)
                        {
                            id
                            score
                            documentations
                            requestsPerDay
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
                for (const [index, value] of res.body.data.appHealthGetApplicationApis.entries())
                {
                    expect(applicationApiSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateApplicationApi', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationApiInput!)
                    {
                        appHealthCreateApplicationApi (payload:$payload)
                        {
                            id
                            applicationId
                            apiInterfaceTypeId
                            score
                            documentations
                            requestsPerDay
                            applicationInfrastructureServiceId
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
                expect(res.body.data.appHealthCreateApplicationApi).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationApi - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationApi (query:$query)
                        {
                            id
                            score
                            documentations
                            requestsPerDay
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
                            id: '6b86475e-5c3d-5e2a-a167-49fa674303ea',
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

    test('/GraphQL appHealthFindApplicationApi', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationApi (query:$query)
                        {
                            id
                            score
                            documentations
                            requestsPerDay
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
                expect(res.body.data.appHealthFindApplicationApi.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationApiById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationApiById (id:$id)
                        {
                            id
                            score
                            documentations
                            requestsPerDay
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '000ca7da-796b-5c26-aa83-cb79e065a7b3',
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

    test('/GraphQL appHealthFindApplicationApiById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationApiById (id:$id)
                        {
                            id
                            score
                            documentations
                            requestsPerDay
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
                expect(res.body.data.appHealthFindApplicationApiById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationApiById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationApiByIdInput!)
                    {
                        appHealthUpdateApplicationApiById (payload:$payload)
                        {
                            id
                            score
                            documentations
                            requestsPerDay
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'ee4e680e-bcd2-5a4e-9c8b-fd911499a660',
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

    test('/GraphQL appHealthUpdateApplicationApiById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationApiByIdInput!)
                    {
                        appHealthUpdateApplicationApiById (payload:$payload)
                        {
                            id
                            score
                            documentations
                            requestsPerDay
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
                expect(res.body.data.appHealthUpdateApplicationApiById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationApis', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationApisInput! $query: QueryStatement)
                    {
                        appHealthUpdateApplicationApis (payload:$payload query:$query)
                        {
                            id
                            score
                            documentations
                            requestsPerDay
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
                expect(res.body.data.appHealthUpdateApplicationApis[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteApplicationApiById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationApiById (id:$id)
                        {
                            id
                            score
                            documentations
                            requestsPerDay
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '938f72d1-cf14-5228-95bb-1d7c781a8017',
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

    test('/GraphQL appHealthDeleteApplicationApiById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationApiById (id:$id)
                        {
                            id
                            score
                            documentations
                            requestsPerDay
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
                expect(res.body.data.appHealthDeleteApplicationApiById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await applicationApiRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});