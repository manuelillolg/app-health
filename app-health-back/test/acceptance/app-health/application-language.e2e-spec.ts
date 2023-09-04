/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIApplicationLanguageRepository, appHealthMockApplicationLanguageData, AppHealthMockApplicationLanguageSeeder } from '@app/app-health/application-language';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('application-language', () =>
{
    let app: INestApplication;
    let applicationLanguageRepository: AppHealthIApplicationLanguageRepository;
    let applicationLanguageSeeder: AppHealthMockApplicationLanguageSeeder;

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
                AppHealthMockApplicationLanguageSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockApplicationLanguageData;
        app = module.createNestApplication();
        applicationLanguageRepository = module.get<AppHealthIApplicationLanguageRepository>(AppHealthIApplicationLanguageRepository);
        applicationLanguageSeeder = module.get<AppHealthMockApplicationLanguageSeeder>(AppHealthMockApplicationLanguageSeeder);

        // seed mock data in memory database
        await applicationLanguageRepository.insert(applicationLanguageSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageApplicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageApplicationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageLanguageId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                languageId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageLanguageId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageVersion property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                version: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageVersion must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageCodeQualityScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                codeQualityScore: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageCodeQualityScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageApplicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageApplicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageLanguageId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                languageId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageLanguageId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageVersion property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                version: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageVersion must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageCodeQualityScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                codeQualityScore: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageCodeQualityScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageLanguageId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                languageId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageLanguageId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageVersion is too large, has a maximum length of 20', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                version: '*********************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageVersion is too large, has a maximum length of 20');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageScore is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST app-health/application-language/create - Got 400 Conflict, ApplicationLanguageCodeQualityScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                codeQualityScore: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationLanguageCodeQualityScore is too large, has a maximum length of 6');
            });
    });


    test('/REST:POST app-health/application-language/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/application-languages/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-languages/paginate')
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
                    total: applicationLanguageSeeder.collectionResponse.length,
                    count: applicationLanguageSeeder.collectionResponse.length,
                    rows : applicationLanguageSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/application-languages/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-languages/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    applicationLanguageSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/application-language/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '7aebec12-c46e-58dd-8528-c655fcf836ee',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/application-language/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/application-language/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/find')
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

    test('/REST:POST app-health/application-language/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/find/da9306be-5e76-5a58-99f1-f04632d1f811')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/application-language/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-language/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/application-language/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-language/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '00ffc428-b5c1-5b83-9052-e327c72cd29b',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/application-language/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-language/update')
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

    test('/REST:DELETE app-health/application-language/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-language/delete/0753870a-7047-5e30-9905-a8c10019adf7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/application-language/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-language/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateApplicationLanguage - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationLanguageInput!)
                    {
                        appHealthCreateApplicationLanguage (payload:$payload)
                        {
                            id
                            applicationId
                            languageId
                            version
                            score
                            codeQualityScore
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

    test('/GraphQL appHealthPaginateApplicationLanguages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateApplicationLanguages (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateApplicationLanguages).toEqual({
                    total: applicationLanguageSeeder.collectionResponse.length,
                    count: applicationLanguageSeeder.collectionResponse.length,
                    rows : applicationLanguageSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetApplicationLanguages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetApplicationLanguages (query:$query)
                        {
                            id
                            version
                            score
                            codeQualityScore
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
                for (const [index, value] of res.body.data.appHealthGetApplicationLanguages.entries())
                {
                    expect(applicationLanguageSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateApplicationLanguage', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationLanguageInput!)
                    {
                        appHealthCreateApplicationLanguage (payload:$payload)
                        {
                            id
                            applicationId
                            languageId
                            version
                            score
                            codeQualityScore
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
                expect(res.body.data.appHealthCreateApplicationLanguage).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationLanguage - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationLanguage (query:$query)
                        {
                            id
                            version
                            score
                            codeQualityScore
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
                            id: '080de760-7447-5e27-aebe-bfa44cfd9049',
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

    test('/GraphQL appHealthFindApplicationLanguage', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationLanguage (query:$query)
                        {
                            id
                            version
                            score
                            codeQualityScore
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
                expect(res.body.data.appHealthFindApplicationLanguage.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationLanguageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationLanguageById (id:$id)
                        {
                            id
                            version
                            score
                            codeQualityScore
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0f42adbf-eb0e-5b13-ba91-228db26d1e19',
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

    test('/GraphQL appHealthFindApplicationLanguageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationLanguageById (id:$id)
                        {
                            id
                            version
                            score
                            codeQualityScore
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
                expect(res.body.data.appHealthFindApplicationLanguageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationLanguageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationLanguageByIdInput!)
                    {
                        appHealthUpdateApplicationLanguageById (payload:$payload)
                        {
                            id
                            version
                            score
                            codeQualityScore
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'c5cc39ed-1893-542f-aa82-032b8354760c',
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

    test('/GraphQL appHealthUpdateApplicationLanguageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationLanguageByIdInput!)
                    {
                        appHealthUpdateApplicationLanguageById (payload:$payload)
                        {
                            id
                            version
                            score
                            codeQualityScore
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
                expect(res.body.data.appHealthUpdateApplicationLanguageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationLanguages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationLanguagesInput! $query: QueryStatement)
                    {
                        appHealthUpdateApplicationLanguages (payload:$payload query:$query)
                        {
                            id
                            version
                            score
                            codeQualityScore
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
                expect(res.body.data.appHealthUpdateApplicationLanguages[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteApplicationLanguageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationLanguageById (id:$id)
                        {
                            id
                            version
                            score
                            codeQualityScore
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1425399e-1873-522f-b12f-0805f8ed6ab3',
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

    test('/GraphQL appHealthDeleteApplicationLanguageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationLanguageById (id:$id)
                        {
                            id
                            version
                            score
                            codeQualityScore
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
                expect(res.body.data.appHealthDeleteApplicationLanguageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await applicationLanguageRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});