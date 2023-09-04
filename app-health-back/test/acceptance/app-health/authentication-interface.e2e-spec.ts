/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIAuthenticationInterfaceRepository, appHealthMockAuthenticationInterfaceData, AppHealthMockAuthenticationInterfaceSeeder } from '@app/app-health/authentication-interface';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('authentication-interface', () =>
{
    let app: INestApplication;
    let authenticationInterfaceRepository: AppHealthIAuthenticationInterfaceRepository;
    let authenticationInterfaceSeeder: AppHealthMockAuthenticationInterfaceSeeder;

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
                AppHealthMockAuthenticationInterfaceSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockAuthenticationInterfaceData;
        app = module.createNestApplication();
        authenticationInterfaceRepository = module.get<AppHealthIAuthenticationInterfaceRepository>(AppHealthIAuthenticationInterfaceRepository);
        authenticationInterfaceSeeder = module.get<AppHealthMockAuthenticationInterfaceSeeder>(AppHealthMockAuthenticationInterfaceSeeder);

        // seed mock data in memory database
        await authenticationInterfaceRepository.insert(authenticationInterfaceSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/authentication-interface/create - Got 400 Conflict, AuthenticationInterfaceId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthenticationInterfaceId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/authentication-interface/create - Got 400 Conflict, AuthenticationInterfaceName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthenticationInterfaceName must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/authentication-interface/create - Got 400 Conflict, AuthenticationInterfaceScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthenticationInterfaceScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/authentication-interface/create - Got 400 Conflict, AuthenticationInterfaceId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthenticationInterfaceId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/authentication-interface/create - Got 400 Conflict, AuthenticationInterfaceName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthenticationInterfaceName must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/authentication-interface/create - Got 400 Conflict, AuthenticationInterfaceScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthenticationInterfaceScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/authentication-interface/create - Got 400 Conflict, AuthenticationInterfaceId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthenticationInterfaceId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/authentication-interface/create - Got 400 Conflict, AuthenticationInterfaceName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthenticationInterfaceName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST app-health/authentication-interface/create - Got 400 Conflict, AuthenticationInterfaceScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthenticationInterfaceScore is too large, has a maximum length of 6');
            });
    });


    test('/REST:POST app-health/authentication-interface/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/authentication-interfaces/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interfaces/paginate')
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
                    total: authenticationInterfaceSeeder.collectionResponse.length,
                    count: authenticationInterfaceSeeder.collectionResponse.length,
                    rows : authenticationInterfaceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/authentication-interfaces/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interfaces/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    authenticationInterfaceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/authentication-interface/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '3340e0a4-24ad-54ce-b2fd-1888f1466122',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/authentication-interface/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/authentication-interface/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/find')
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

    test('/REST:POST app-health/authentication-interface/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/find/c527cc4b-cdf1-53cc-8aa5-6d52b00a136b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/authentication-interface/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/authentication-interface/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/authentication-interface/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/authentication-interface/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'd03c2ff0-fd39-5350-b54f-c92d5c23e5cf',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/authentication-interface/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/authentication-interface/update')
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

    test('/REST:DELETE app-health/authentication-interface/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/authentication-interface/delete/076d4f08-474a-59e6-93be-a2fa878db1a8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/authentication-interface/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/authentication-interface/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateAuthenticationInterface - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateAuthenticationInterfaceInput!)
                    {
                        appHealthCreateAuthenticationInterface (payload:$payload)
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

    test('/GraphQL appHealthPaginateAuthenticationInterfaces', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateAuthenticationInterfaces (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateAuthenticationInterfaces).toEqual({
                    total: authenticationInterfaceSeeder.collectionResponse.length,
                    count: authenticationInterfaceSeeder.collectionResponse.length,
                    rows : authenticationInterfaceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetAuthenticationInterfaces', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetAuthenticationInterfaces (query:$query)
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
                for (const [index, value] of res.body.data.appHealthGetAuthenticationInterfaces.entries())
                {
                    expect(authenticationInterfaceSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateAuthenticationInterface', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateAuthenticationInterfaceInput!)
                    {
                        appHealthCreateAuthenticationInterface (payload:$payload)
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
                expect(res.body.data.appHealthCreateAuthenticationInterface).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindAuthenticationInterface - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindAuthenticationInterface (query:$query)
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
                            id: 'bd88d850-c3cf-5342-add8-37630f08de21',
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

    test('/GraphQL appHealthFindAuthenticationInterface', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindAuthenticationInterface (query:$query)
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
                expect(res.body.data.appHealthFindAuthenticationInterface.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindAuthenticationInterfaceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindAuthenticationInterfaceById (id:$id)
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
                    id: '8039cb64-0c6c-54f2-878a-a7502e43e4e7',
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

    test('/GraphQL appHealthFindAuthenticationInterfaceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindAuthenticationInterfaceById (id:$id)
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
                expect(res.body.data.appHealthFindAuthenticationInterfaceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateAuthenticationInterfaceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateAuthenticationInterfaceByIdInput!)
                    {
                        appHealthUpdateAuthenticationInterfaceById (payload:$payload)
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
                        id: '771f486b-76cd-5694-93f3-23b0b6c503c0',
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

    test('/GraphQL appHealthUpdateAuthenticationInterfaceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateAuthenticationInterfaceByIdInput!)
                    {
                        appHealthUpdateAuthenticationInterfaceById (payload:$payload)
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
                expect(res.body.data.appHealthUpdateAuthenticationInterfaceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateAuthenticationInterfaces', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateAuthenticationInterfacesInput! $query: QueryStatement)
                    {
                        appHealthUpdateAuthenticationInterfaces (payload:$payload query:$query)
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
                expect(res.body.data.appHealthUpdateAuthenticationInterfaces[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteAuthenticationInterfaceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteAuthenticationInterfaceById (id:$id)
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
                    id: '68d1c424-440e-5a2a-b8f6-478227b1f9fa',
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

    test('/GraphQL appHealthDeleteAuthenticationInterfaceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteAuthenticationInterfaceById (id:$id)
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
                expect(res.body.data.appHealthDeleteAuthenticationInterfaceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await authenticationInterfaceRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});