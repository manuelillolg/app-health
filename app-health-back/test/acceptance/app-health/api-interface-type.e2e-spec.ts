/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIApiInterfaceTypeRepository, appHealthMockApiInterfaceTypeData, AppHealthMockApiInterfaceTypeSeeder } from '@app/app-health/api-interface-type';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('api-interface-type', () =>
{
    let app: INestApplication;
    let apiInterfaceTypeRepository: AppHealthIApiInterfaceTypeRepository;
    let apiInterfaceTypeSeeder: AppHealthMockApiInterfaceTypeSeeder;

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
                AppHealthMockApiInterfaceTypeSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockApiInterfaceTypeData;
        app = module.createNestApplication();
        apiInterfaceTypeRepository = module.get<AppHealthIApiInterfaceTypeRepository>(AppHealthIApiInterfaceTypeRepository);
        apiInterfaceTypeSeeder = module.get<AppHealthMockApiInterfaceTypeSeeder>(AppHealthMockApiInterfaceTypeSeeder);

        // seed mock data in memory database
        await apiInterfaceTypeRepository.insert(apiInterfaceTypeSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/api-interface-type/create - Got 400 Conflict, ApiInterfaceTypeId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApiInterfaceTypeId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/api-interface-type/create - Got 400 Conflict, ApiInterfaceTypeName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApiInterfaceTypeName must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/api-interface-type/create - Got 400 Conflict, ApiInterfaceTypeScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApiInterfaceTypeScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/api-interface-type/create - Got 400 Conflict, ApiInterfaceTypeId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApiInterfaceTypeId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/api-interface-type/create - Got 400 Conflict, ApiInterfaceTypeName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApiInterfaceTypeName must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/api-interface-type/create - Got 400 Conflict, ApiInterfaceTypeScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApiInterfaceTypeScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/api-interface-type/create - Got 400 Conflict, ApiInterfaceTypeId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApiInterfaceTypeId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/api-interface-type/create - Got 400 Conflict, ApiInterfaceTypeName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApiInterfaceTypeName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST app-health/api-interface-type/create - Got 400 Conflict, ApiInterfaceTypeScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApiInterfaceTypeScore is too large, has a maximum length of 6');
            });
    });


    test('/REST:POST app-health/api-interface-type/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/api-interface-types/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-types/paginate')
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
                    total: apiInterfaceTypeSeeder.collectionResponse.length,
                    count: apiInterfaceTypeSeeder.collectionResponse.length,
                    rows : apiInterfaceTypeSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/api-interface-types/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-types/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    apiInterfaceTypeSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/api-interface-type/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '0d286421-819a-5f29-b322-fb4c5738e7b7',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/api-interface-type/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/api-interface-type/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/find')
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

    test('/REST:POST app-health/api-interface-type/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/find/499c0814-240c-5ba8-9656-89e39baa156a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/api-interface-type/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/api-interface-type/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/api-interface-type/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/api-interface-type/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '2f405268-c076-5789-a89c-a44291232573',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/api-interface-type/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/api-interface-type/update')
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

    test('/REST:DELETE app-health/api-interface-type/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/api-interface-type/delete/a96f0b44-2736-5fac-96d7-45e2489d17d5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/api-interface-type/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/api-interface-type/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateApiInterfaceType - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApiInterfaceTypeInput!)
                    {
                        appHealthCreateApiInterfaceType (payload:$payload)
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

    test('/GraphQL appHealthPaginateApiInterfaceTypes', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateApiInterfaceTypes (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateApiInterfaceTypes).toEqual({
                    total: apiInterfaceTypeSeeder.collectionResponse.length,
                    count: apiInterfaceTypeSeeder.collectionResponse.length,
                    rows : apiInterfaceTypeSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetApiInterfaceTypes', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetApiInterfaceTypes (query:$query)
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
                for (const [index, value] of res.body.data.appHealthGetApiInterfaceTypes.entries())
                {
                    expect(apiInterfaceTypeSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateApiInterfaceType', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApiInterfaceTypeInput!)
                    {
                        appHealthCreateApiInterfaceType (payload:$payload)
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
                expect(res.body.data.appHealthCreateApiInterfaceType).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApiInterfaceType - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApiInterfaceType (query:$query)
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
                            id: '14800b8c-b401-521f-b96f-ef0c1c4cef82',
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

    test('/GraphQL appHealthFindApiInterfaceType', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApiInterfaceType (query:$query)
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
                expect(res.body.data.appHealthFindApiInterfaceType.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApiInterfaceTypeById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApiInterfaceTypeById (id:$id)
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
                    id: '87ae6822-362d-5077-8b76-ee5b5894b6b1',
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

    test('/GraphQL appHealthFindApiInterfaceTypeById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApiInterfaceTypeById (id:$id)
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
                expect(res.body.data.appHealthFindApiInterfaceTypeById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApiInterfaceTypeById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApiInterfaceTypeByIdInput!)
                    {
                        appHealthUpdateApiInterfaceTypeById (payload:$payload)
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
                        id: '537bcd99-0b1a-56c8-9d42-2cafa921baf2',
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

    test('/GraphQL appHealthUpdateApiInterfaceTypeById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApiInterfaceTypeByIdInput!)
                    {
                        appHealthUpdateApiInterfaceTypeById (payload:$payload)
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
                expect(res.body.data.appHealthUpdateApiInterfaceTypeById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApiInterfaceTypes', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApiInterfaceTypesInput! $query: QueryStatement)
                    {
                        appHealthUpdateApiInterfaceTypes (payload:$payload query:$query)
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
                expect(res.body.data.appHealthUpdateApiInterfaceTypes[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteApiInterfaceTypeById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApiInterfaceTypeById (id:$id)
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
                    id: '450e1127-25e2-5bca-9a1c-061087b3883d',
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

    test('/GraphQL appHealthDeleteApiInterfaceTypeById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApiInterfaceTypeById (id:$id)
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
                expect(res.body.data.appHealthDeleteApiInterfaceTypeById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await apiInterfaceTypeRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});