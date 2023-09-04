/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthILanguageRepository, appHealthMockLanguageData, AppHealthMockLanguageSeeder } from '@app/app-health/language';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('language', () =>
{
    let app: INestApplication;
    let languageRepository: AppHealthILanguageRepository;
    let languageSeeder: AppHealthMockLanguageSeeder;

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
                AppHealthMockLanguageSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockLanguageData;
        app = module.createNestApplication();
        languageRepository = module.get<AppHealthILanguageRepository>(AppHealthILanguageRepository);
        languageSeeder = module.get<AppHealthMockLanguageSeeder>(AppHealthMockLanguageSeeder);

        // seed mock data in memory database
        await languageRepository.insert(languageSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/language/create - Got 400 Conflict, LanguageId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LanguageId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/language/create - Got 400 Conflict, LanguageName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LanguageName must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/language/create - Got 400 Conflict, LanguageVersions property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                versions: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LanguageVersions must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/language/create - Got 400 Conflict, LanguageId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LanguageId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/language/create - Got 400 Conflict, LanguageName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LanguageName must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/language/create - Got 400 Conflict, LanguageVersions property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                versions: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LanguageVersions must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/language/create - Got 400 Conflict, LanguageId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LanguageId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/language/create - Got 400 Conflict, LanguageName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LanguageName is too large, has a maximum length of 255');
            });
    });


    test('/REST:POST app-health/language/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/languages/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/languages/paginate')
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
                    total: languageSeeder.collectionResponse.length,
                    count: languageSeeder.collectionResponse.length,
                    rows : languageSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/languages/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/languages/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    languageSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/language/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '4fc8c46f-82e6-5bc6-a5ba-623bf4ff21ac',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/language/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/language/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/find')
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

    test('/REST:POST app-health/language/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/find/df3f171a-8020-5291-a908-523c6ce35ee7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/language/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/language/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/language/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/language/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '141ed529-be91-5225-abec-0f9fce5c1f84',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/language/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/language/update')
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

    test('/REST:DELETE app-health/language/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/language/delete/51463d04-8d9f-574c-8273-b9d8c7105ece')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/language/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/language/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateLanguage - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateLanguageInput!)
                    {
                        appHealthCreateLanguage (payload:$payload)
                        {
                            id
                            name
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

    test('/GraphQL appHealthPaginateLanguages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateLanguages (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateLanguages).toEqual({
                    total: languageSeeder.collectionResponse.length,
                    count: languageSeeder.collectionResponse.length,
                    rows : languageSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetLanguages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetLanguages (query:$query)
                        {
                            id
                            name
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
                for (const [index, value] of res.body.data.appHealthGetLanguages.entries())
                {
                    expect(languageSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateLanguage', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateLanguageInput!)
                    {
                        appHealthCreateLanguage (payload:$payload)
                        {
                            id
                            name
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
                expect(res.body.data.appHealthCreateLanguage).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindLanguage - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindLanguage (query:$query)
                        {
                            id
                            name
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
                            id: '8a59f21b-d743-5cf8-a789-4e12267e6f02',
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

    test('/GraphQL appHealthFindLanguage', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindLanguage (query:$query)
                        {
                            id
                            name
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
                expect(res.body.data.appHealthFindLanguage.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindLanguageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindLanguageById (id:$id)
                        {
                            id
                            name
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '74d169c0-fd62-55bd-adaa-aa0d3d4242b7',
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

    test('/GraphQL appHealthFindLanguageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindLanguageById (id:$id)
                        {
                            id
                            name
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
                expect(res.body.data.appHealthFindLanguageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateLanguageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateLanguageByIdInput!)
                    {
                        appHealthUpdateLanguageById (payload:$payload)
                        {
                            id
                            name
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '60bd5334-066a-57b1-9cf6-74e6cb4a6447',
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

    test('/GraphQL appHealthUpdateLanguageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateLanguageByIdInput!)
                    {
                        appHealthUpdateLanguageById (payload:$payload)
                        {
                            id
                            name
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
                expect(res.body.data.appHealthUpdateLanguageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateLanguages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateLanguagesInput! $query: QueryStatement)
                    {
                        appHealthUpdateLanguages (payload:$payload query:$query)
                        {
                            id
                            name
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
                expect(res.body.data.appHealthUpdateLanguages[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteLanguageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteLanguageById (id:$id)
                        {
                            id
                            name
                            versions
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '80eab1c3-28e9-5211-9e1d-7be05530e764',
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

    test('/GraphQL appHealthDeleteLanguageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteLanguageById (id:$id)
                        {
                            id
                            name
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
                expect(res.body.data.appHealthDeleteLanguageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await languageRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});