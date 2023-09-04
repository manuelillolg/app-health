/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIAuthorizationInterfaceRepository, appHealthMockAuthorizationInterfaceData, AppHealthMockAuthorizationInterfaceSeeder } from '@app/app-health/authorization-interface';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('authorization-interface', () =>
{
    let app: INestApplication;
    let authorizationInterfaceRepository: AppHealthIAuthorizationInterfaceRepository;
    let authorizationInterfaceSeeder: AppHealthMockAuthorizationInterfaceSeeder;

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
                AppHealthMockAuthorizationInterfaceSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockAuthorizationInterfaceData;
        app = module.createNestApplication();
        authorizationInterfaceRepository = module.get<AppHealthIAuthorizationInterfaceRepository>(AppHealthIAuthorizationInterfaceRepository);
        authorizationInterfaceSeeder = module.get<AppHealthMockAuthorizationInterfaceSeeder>(AppHealthMockAuthorizationInterfaceSeeder);

        // seed mock data in memory database
        await authorizationInterfaceRepository.insert(authorizationInterfaceSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/authorization-interface/create - Got 400 Conflict, AuthorizationInterfaceId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorizationInterfaceId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/authorization-interface/create - Got 400 Conflict, AuthorizationInterfaceName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorizationInterfaceName must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/authorization-interface/create - Got 400 Conflict, AuthorizationInterfaceScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorizationInterfaceScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/authorization-interface/create - Got 400 Conflict, AuthorizationInterfaceId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorizationInterfaceId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/authorization-interface/create - Got 400 Conflict, AuthorizationInterfaceName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorizationInterfaceName must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/authorization-interface/create - Got 400 Conflict, AuthorizationInterfaceScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorizationInterfaceScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/authorization-interface/create - Got 400 Conflict, AuthorizationInterfaceId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorizationInterfaceId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/authorization-interface/create - Got 400 Conflict, AuthorizationInterfaceName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorizationInterfaceName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST app-health/authorization-interface/create - Got 400 Conflict, AuthorizationInterfaceScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorizationInterfaceScore is too large, has a maximum length of 6');
            });
    });


    test('/REST:POST app-health/authorization-interface/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/authorization-interfaces/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interfaces/paginate')
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
                    total: authorizationInterfaceSeeder.collectionResponse.length,
                    count: authorizationInterfaceSeeder.collectionResponse.length,
                    rows : authorizationInterfaceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/authorization-interfaces/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interfaces/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    authorizationInterfaceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/authorization-interface/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '778280eb-4dfd-510f-b455-cff267654956',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/authorization-interface/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/authorization-interface/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/find')
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

    test('/REST:POST app-health/authorization-interface/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/find/14d3b90c-b0b8-55fa-9113-3e05584a6327')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/authorization-interface/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authorization-interface/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/authorization-interface/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/authorization-interface/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'ca8aca26-875d-5b69-b0a7-b2a71365e95b',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/authorization-interface/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/authorization-interface/update')
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

    test('/REST:DELETE app-health/authorization-interface/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/authorization-interface/delete/0867cacf-8f37-5004-8887-630664e000c3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/authorization-interface/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/authorization-interface/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateAuthorizationInterface - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateAuthorizationInterfaceInput!)
                    {
                        appHealthCreateAuthorizationInterface (payload:$payload)
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

    test('/GraphQL appHealthPaginateAuthorizationInterfaces', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateAuthorizationInterfaces (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateAuthorizationInterfaces).toEqual({
                    total: authorizationInterfaceSeeder.collectionResponse.length,
                    count: authorizationInterfaceSeeder.collectionResponse.length,
                    rows : authorizationInterfaceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetAuthorizationInterfaces', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetAuthorizationInterfaces (query:$query)
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
                for (const [index, value] of res.body.data.appHealthGetAuthorizationInterfaces.entries())
                {
                    expect(authorizationInterfaceSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateAuthorizationInterface', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateAuthorizationInterfaceInput!)
                    {
                        appHealthCreateAuthorizationInterface (payload:$payload)
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
                expect(res.body.data.appHealthCreateAuthorizationInterface).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindAuthorizationInterface - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindAuthorizationInterface (query:$query)
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
                            id: 'c37a2842-c249-58d4-8945-5476d3a2fc69',
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

    test('/GraphQL appHealthFindAuthorizationInterface', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindAuthorizationInterface (query:$query)
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
                expect(res.body.data.appHealthFindAuthorizationInterface.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindAuthorizationInterfaceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindAuthorizationInterfaceById (id:$id)
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
                    id: '35c56f00-405d-5386-88e4-99c090129034',
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

    test('/GraphQL appHealthFindAuthorizationInterfaceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindAuthorizationInterfaceById (id:$id)
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
                expect(res.body.data.appHealthFindAuthorizationInterfaceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateAuthorizationInterfaceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateAuthorizationInterfaceByIdInput!)
                    {
                        appHealthUpdateAuthorizationInterfaceById (payload:$payload)
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
                        id: 'c0a06564-a8a8-5f25-beb3-e40993d3a54a',
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

    test('/GraphQL appHealthUpdateAuthorizationInterfaceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateAuthorizationInterfaceByIdInput!)
                    {
                        appHealthUpdateAuthorizationInterfaceById (payload:$payload)
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
                expect(res.body.data.appHealthUpdateAuthorizationInterfaceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateAuthorizationInterfaces', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateAuthorizationInterfacesInput! $query: QueryStatement)
                    {
                        appHealthUpdateAuthorizationInterfaces (payload:$payload query:$query)
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
                expect(res.body.data.appHealthUpdateAuthorizationInterfaces[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteAuthorizationInterfaceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteAuthorizationInterfaceById (id:$id)
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
                    id: '7755701c-0496-5ef6-bc80-36526943d5e8',
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

    test('/GraphQL appHealthDeleteAuthorizationInterfaceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteAuthorizationInterfaceById (id:$id)
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
                expect(res.body.data.appHealthDeleteAuthorizationInterfaceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await authorizationInterfaceRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});