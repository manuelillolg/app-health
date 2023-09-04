/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIApplicationAuthorizationRepository, appHealthMockApplicationAuthorizationData, AppHealthMockApplicationAuthorizationSeeder } from '@app/app-health/application-authorization';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('application-authorization', () =>
{
    let app: INestApplication;
    let applicationAuthorizationRepository: AppHealthIApplicationAuthorizationRepository;
    let applicationAuthorizationSeeder: AppHealthMockApplicationAuthorizationSeeder;

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
                AppHealthMockApplicationAuthorizationSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockApplicationAuthorizationData;
        app = module.createNestApplication();
        applicationAuthorizationRepository = module.get<AppHealthIApplicationAuthorizationRepository>(AppHealthIApplicationAuthorizationRepository);
        applicationAuthorizationSeeder = module.get<AppHealthMockApplicationAuthorizationSeeder>(AppHealthMockApplicationAuthorizationSeeder);

        // seed mock data in memory database
        await applicationAuthorizationRepository.insert(applicationAuthorizationSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationApplicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationApplicationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationAuthorizationInterfaceId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                authorizationInterfaceId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationAuthorizationInterfaceId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationApplicationInfrastructureServiceId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationApplicationInfrastructureServiceId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationApplicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationApplicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationAuthorizationInterfaceId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                authorizationInterfaceId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationAuthorizationInterfaceId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationApplicationInfrastructureServiceId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationApplicationInfrastructureServiceId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationAuthorizationInterfaceId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                authorizationInterfaceId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationAuthorizationInterfaceId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationApplicationInfrastructureServiceId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationApplicationInfrastructureServiceId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationTotalUsers is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalUsers: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationTotalUsers is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationScore is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationScore is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationTotalUsers must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalUsers: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationAuthorizationTotalUsers must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST app-health/application-authorization/create - Got 400 Conflict, ApplicationAuthorizationScore must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationAuthorizationScore must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST app-health/application-authorization/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/application-authorizations/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorizations/paginate')
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
                    total: applicationAuthorizationSeeder.collectionResponse.length,
                    count: applicationAuthorizationSeeder.collectionResponse.length,
                    rows : applicationAuthorizationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/application-authorizations/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorizations/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    applicationAuthorizationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/application-authorization/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '1191db41-ccc2-5e2d-a872-535b9f7540e7',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/application-authorization/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/application-authorization/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/find')
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

    test('/REST:POST app-health/application-authorization/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/find/ddce3aea-e304-51f5-8a7a-220609af1ecf')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/application-authorization/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authorization/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/application-authorization/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-authorization/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '8eea76ea-01f2-5d79-8c20-b7e842354cf4',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/application-authorization/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-authorization/update')
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

    test('/REST:DELETE app-health/application-authorization/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-authorization/delete/51ee9e53-35ef-5410-a8ce-118d53d26e5c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/application-authorization/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-authorization/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateApplicationAuthorization - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationAuthorizationInput!)
                    {
                        appHealthCreateApplicationAuthorization (payload:$payload)
                        {
                            id
                            applicationId
                            authorizationInterfaceId
                            totalUsers
                            score
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

    test('/GraphQL appHealthPaginateApplicationAuthorizations', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateApplicationAuthorizations (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateApplicationAuthorizations).toEqual({
                    total: applicationAuthorizationSeeder.collectionResponse.length,
                    count: applicationAuthorizationSeeder.collectionResponse.length,
                    rows : applicationAuthorizationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetApplicationAuthorizations', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetApplicationAuthorizations (query:$query)
                        {
                            id
                            totalUsers
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
                for (const [index, value] of res.body.data.appHealthGetApplicationAuthorizations.entries())
                {
                    expect(applicationAuthorizationSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateApplicationAuthorization', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationAuthorizationInput!)
                    {
                        appHealthCreateApplicationAuthorization (payload:$payload)
                        {
                            id
                            applicationId
                            authorizationInterfaceId
                            totalUsers
                            score
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
                expect(res.body.data.appHealthCreateApplicationAuthorization).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationAuthorization - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationAuthorization (query:$query)
                        {
                            id
                            totalUsers
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
                            id: '47977c79-86d6-5512-b763-818ba33700e2',
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

    test('/GraphQL appHealthFindApplicationAuthorization', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationAuthorization (query:$query)
                        {
                            id
                            totalUsers
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
                expect(res.body.data.appHealthFindApplicationAuthorization.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationAuthorizationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationAuthorizationById (id:$id)
                        {
                            id
                            totalUsers
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'daceffcb-7bea-5e91-b41f-c2b59c811398',
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

    test('/GraphQL appHealthFindApplicationAuthorizationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationAuthorizationById (id:$id)
                        {
                            id
                            totalUsers
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
                expect(res.body.data.appHealthFindApplicationAuthorizationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationAuthorizationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationAuthorizationByIdInput!)
                    {
                        appHealthUpdateApplicationAuthorizationById (payload:$payload)
                        {
                            id
                            totalUsers
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '118dd9f7-0914-53fe-b57d-e857e916736e',
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

    test('/GraphQL appHealthUpdateApplicationAuthorizationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationAuthorizationByIdInput!)
                    {
                        appHealthUpdateApplicationAuthorizationById (payload:$payload)
                        {
                            id
                            totalUsers
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
                expect(res.body.data.appHealthUpdateApplicationAuthorizationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationAuthorizations', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationAuthorizationsInput! $query: QueryStatement)
                    {
                        appHealthUpdateApplicationAuthorizations (payload:$payload query:$query)
                        {
                            id
                            totalUsers
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
                expect(res.body.data.appHealthUpdateApplicationAuthorizations[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteApplicationAuthorizationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationAuthorizationById (id:$id)
                        {
                            id
                            totalUsers
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd7a07b1c-abb5-541b-a8fc-d05075fe62bf',
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

    test('/GraphQL appHealthDeleteApplicationAuthorizationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationAuthorizationById (id:$id)
                        {
                            id
                            totalUsers
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
                expect(res.body.data.appHealthDeleteApplicationAuthorizationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await applicationAuthorizationRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});