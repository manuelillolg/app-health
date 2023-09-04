/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIApplicationAuthenticationRepository, appHealthMockApplicationAuthenticationData, AppHealthMockApplicationAuthenticationSeeder } from '@app/app-health/application-authentication';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('application-authentication', () =>
{
    let app: INestApplication;
    let applicationAuthenticationRepository: AppHealthIApplicationAuthenticationRepository;
    let applicationAuthenticationSeeder: AppHealthMockApplicationAuthenticationSeeder;

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
                AppHealthMockApplicationAuthenticationSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockApplicationAuthenticationData;
        app = module.createNestApplication();
        applicationAuthenticationRepository = module.get<AppHealthIApplicationAuthenticationRepository>(AppHealthIApplicationAuthenticationRepository);
        applicationAuthenticationSeeder = module.get<AppHealthMockApplicationAuthenticationSeeder>(AppHealthMockApplicationAuthenticationSeeder);

        // seed mock data in memory database
        await applicationAuthenticationRepository.insert(applicationAuthenticationSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationApplicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationApplicationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationAuthenticationInterfaceId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                authenticationInterfaceId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationAuthenticationInterfaceId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationApplicationInfrastructureServiceId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationApplicationInfrastructureServiceId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationApplicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationApplicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationAuthenticationInterfaceId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                authenticationInterfaceId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationAuthenticationInterfaceId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationApplicationInfrastructureServiceId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationApplicationInfrastructureServiceId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationAuthenticationInterfaceId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                authenticationInterfaceId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationAuthenticationInterfaceId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationApplicationInfrastructureServiceId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationApplicationInfrastructureServiceId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationTotalUsers is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalUsers: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationTotalUsers is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationScore is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthenticationScore is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationTotalUsers must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalUsers: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationAuthenticationTotalUsers must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST app-health/application-authentication/create - Got 400 Conflict, ApplicationAuthenticationScore must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationAuthenticationScore must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST app-health/application-authentication/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/application-authentications/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentications/paginate')
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
                    total: applicationAuthenticationSeeder.collectionResponse.length,
                    count: applicationAuthenticationSeeder.collectionResponse.length,
                    rows : applicationAuthenticationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/application-authentications/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentications/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    applicationAuthenticationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/application-authentication/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '0063f7fd-fb10-5e44-8c6f-932be0cb4871',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/application-authentication/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/application-authentication/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/find')
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

    test('/REST:POST app-health/application-authentication/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/find/1c78a6dc-afb4-57a9-a5b2-f2ca38da2055')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/application-authentication/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-authentication/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/application-authentication/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-authentication/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'e1a79473-048c-5e7d-982c-34e988c3bf83',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/application-authentication/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-authentication/update')
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

    test('/REST:DELETE app-health/application-authentication/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-authentication/delete/9ac82cec-dd81-58f2-857b-235c426b3711')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/application-authentication/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-authentication/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateApplicationAuthentication - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationAuthenticationInput!)
                    {
                        appHealthCreateApplicationAuthentication (payload:$payload)
                        {
                            id
                            applicationId
                            authenticationInterfaceId
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

    test('/GraphQL appHealthPaginateApplicationAuthentications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateApplicationAuthentications (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateApplicationAuthentications).toEqual({
                    total: applicationAuthenticationSeeder.collectionResponse.length,
                    count: applicationAuthenticationSeeder.collectionResponse.length,
                    rows : applicationAuthenticationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetApplicationAuthentications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetApplicationAuthentications (query:$query)
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
                for (const [index, value] of res.body.data.appHealthGetApplicationAuthentications.entries())
                {
                    expect(applicationAuthenticationSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateApplicationAuthentication', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationAuthenticationInput!)
                    {
                        appHealthCreateApplicationAuthentication (payload:$payload)
                        {
                            id
                            applicationId
                            authenticationInterfaceId
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
                expect(res.body.data.appHealthCreateApplicationAuthentication).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationAuthentication - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationAuthentication (query:$query)
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
                            id: '926bdb3c-399f-5a6b-bd63-6bf25d1e918d',
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

    test('/GraphQL appHealthFindApplicationAuthentication', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationAuthentication (query:$query)
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
                expect(res.body.data.appHealthFindApplicationAuthentication.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationAuthenticationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationAuthenticationById (id:$id)
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
                    id: '1dc439c4-48a0-5686-9f4d-9018f692be18',
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

    test('/GraphQL appHealthFindApplicationAuthenticationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationAuthenticationById (id:$id)
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
                expect(res.body.data.appHealthFindApplicationAuthenticationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationAuthenticationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationAuthenticationByIdInput!)
                    {
                        appHealthUpdateApplicationAuthenticationById (payload:$payload)
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
                        id: '230d38f5-aee9-5cef-929e-c4cf633b56e6',
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

    test('/GraphQL appHealthUpdateApplicationAuthenticationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationAuthenticationByIdInput!)
                    {
                        appHealthUpdateApplicationAuthenticationById (payload:$payload)
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
                expect(res.body.data.appHealthUpdateApplicationAuthenticationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationAuthentications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationAuthenticationsInput! $query: QueryStatement)
                    {
                        appHealthUpdateApplicationAuthentications (payload:$payload query:$query)
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
                expect(res.body.data.appHealthUpdateApplicationAuthentications[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteApplicationAuthenticationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationAuthenticationById (id:$id)
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
                    id: '62360cfd-5f5e-5c7e-af9e-4385181232a1',
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

    test('/GraphQL appHealthDeleteApplicationAuthenticationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationAuthenticationById (id:$id)
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
                expect(res.body.data.appHealthDeleteApplicationAuthenticationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await applicationAuthenticationRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});