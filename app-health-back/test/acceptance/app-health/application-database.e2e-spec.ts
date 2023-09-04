/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIApplicationDatabaseRepository, appHealthMockApplicationDatabaseData, AppHealthMockApplicationDatabaseSeeder } from '@app/app-health/application-database';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('application-database', () =>
{
    let app: INestApplication;
    let applicationDatabaseRepository: AppHealthIApplicationDatabaseRepository;
    let applicationDatabaseSeeder: AppHealthMockApplicationDatabaseSeeder;

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
                AppHealthMockApplicationDatabaseSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockApplicationDatabaseData;
        app = module.createNestApplication();
        applicationDatabaseRepository = module.get<AppHealthIApplicationDatabaseRepository>(AppHealthIApplicationDatabaseRepository);
        applicationDatabaseSeeder = module.get<AppHealthMockApplicationDatabaseSeeder>(AppHealthMockApplicationDatabaseSeeder);

        // seed mock data in memory database
        await applicationDatabaseRepository.insert(applicationDatabaseSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseApplicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseApplicationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseDatabaseId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                databaseId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseDatabaseId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseVersion property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                version: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseVersion must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseApplicationInfrastructureServiceId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseApplicationInfrastructureServiceId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseApplicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseApplicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseDatabaseId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                databaseId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseDatabaseId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseVersion property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                version: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseVersion must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseApplicationInfrastructureServiceId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseApplicationInfrastructureServiceId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseDatabaseId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                databaseId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseDatabaseId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseApplicationInfrastructureServiceId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationInfrastructureServiceId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseApplicationInfrastructureServiceId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseVersion is too large, has a maximum length of 20', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                version: '*********************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseVersion is too large, has a maximum length of 20');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseSize is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                size: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseSize is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseScore is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseTotalCollectionsTables is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalCollectionsTables: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseTotalCollectionsTables is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseTotalFields is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalFields: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationDatabaseTotalFields is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseTotalCollectionsTables must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalCollectionsTables: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationDatabaseTotalCollectionsTables must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST app-health/application-database/create - Got 400 Conflict, ApplicationDatabaseTotalFields must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalFields: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationDatabaseTotalFields must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST app-health/application-database/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/application-databases/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-databases/paginate')
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
                    total: applicationDatabaseSeeder.collectionResponse.length,
                    count: applicationDatabaseSeeder.collectionResponse.length,
                    rows : applicationDatabaseSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/application-databases/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-databases/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    applicationDatabaseSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/application-database/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'd5ecc867-f5cd-55bd-9356-c53a85887a54',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/application-database/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/application-database/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/find')
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

    test('/REST:POST app-health/application-database/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/find/ccc51380-eaf1-559d-adc5-376fbe90ed79')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/application-database/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-database/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/application-database/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-database/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '16cf8b7f-da78-5577-b574-bcc6795a1685',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/application-database/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-database/update')
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

    test('/REST:DELETE app-health/application-database/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-database/delete/45f8dbf9-2d50-5dda-9f74-cac6859a1397')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/application-database/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-database/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateApplicationDatabase - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationDatabaseInput!)
                    {
                        appHealthCreateApplicationDatabase (payload:$payload)
                        {
                            id
                            applicationId
                            databaseId
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
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

    test('/GraphQL appHealthPaginateApplicationDatabases', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateApplicationDatabases (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateApplicationDatabases).toEqual({
                    total: applicationDatabaseSeeder.collectionResponse.length,
                    count: applicationDatabaseSeeder.collectionResponse.length,
                    rows : applicationDatabaseSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetApplicationDatabases', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetApplicationDatabases (query:$query)
                        {
                            id
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
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
                for (const [index, value] of res.body.data.appHealthGetApplicationDatabases.entries())
                {
                    expect(applicationDatabaseSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateApplicationDatabase', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationDatabaseInput!)
                    {
                        appHealthCreateApplicationDatabase (payload:$payload)
                        {
                            id
                            applicationId
                            databaseId
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
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
                expect(res.body.data.appHealthCreateApplicationDatabase).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationDatabase - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationDatabase (query:$query)
                        {
                            id
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
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
                            id: '7af26a27-041a-5848-bd26-a84c38c50dd6',
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

    test('/GraphQL appHealthFindApplicationDatabase', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationDatabase (query:$query)
                        {
                            id
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
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
                expect(res.body.data.appHealthFindApplicationDatabase.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationDatabaseById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationDatabaseById (id:$id)
                        {
                            id
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f3c2cdaa-7548-55c8-a36d-59de39361d01',
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

    test('/GraphQL appHealthFindApplicationDatabaseById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationDatabaseById (id:$id)
                        {
                            id
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
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
                expect(res.body.data.appHealthFindApplicationDatabaseById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationDatabaseById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationDatabaseByIdInput!)
                    {
                        appHealthUpdateApplicationDatabaseById (payload:$payload)
                        {
                            id
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '080ab561-4aef-568b-acda-8f788a5ec540',
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

    test('/GraphQL appHealthUpdateApplicationDatabaseById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationDatabaseByIdInput!)
                    {
                        appHealthUpdateApplicationDatabaseById (payload:$payload)
                        {
                            id
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
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
                expect(res.body.data.appHealthUpdateApplicationDatabaseById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationDatabases', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationDatabasesInput! $query: QueryStatement)
                    {
                        appHealthUpdateApplicationDatabases (payload:$payload query:$query)
                        {
                            id
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
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
                expect(res.body.data.appHealthUpdateApplicationDatabases[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteApplicationDatabaseById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationDatabaseById (id:$id)
                        {
                            id
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bcc47dbf-06f9-55ca-968e-622f9b9ec204',
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

    test('/GraphQL appHealthDeleteApplicationDatabaseById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationDatabaseById (id:$id)
                        {
                            id
                            version
                            size
                            score
                            totalCollectionsTables
                            totalFields
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
                expect(res.body.data.appHealthDeleteApplicationDatabaseById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await applicationDatabaseRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});