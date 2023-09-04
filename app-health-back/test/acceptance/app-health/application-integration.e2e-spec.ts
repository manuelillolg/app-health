/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIApplicationIntegrationRepository, appHealthMockApplicationIntegrationData, AppHealthMockApplicationIntegrationSeeder } from '@app/app-health/application-integration';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('application-integration', () =>
{
    let app: INestApplication;
    let applicationIntegrationRepository: AppHealthIApplicationIntegrationRepository;
    let applicationIntegrationSeeder: AppHealthMockApplicationIntegrationSeeder;

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
                AppHealthMockApplicationIntegrationSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockApplicationIntegrationData;
        app = module.createNestApplication();
        applicationIntegrationRepository = module.get<AppHealthIApplicationIntegrationRepository>(AppHealthIApplicationIntegrationRepository);
        applicationIntegrationSeeder = module.get<AppHealthMockApplicationIntegrationSeeder>(AppHealthMockApplicationIntegrationSeeder);

        // seed mock data in memory database
        await applicationIntegrationRepository.insert(applicationIntegrationSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationName must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationSourceApplicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sourceApplicationId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationSourceApplicationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationApiInterfaceTypeId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                apiInterfaceTypeId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationApiInterfaceTypeId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationModality property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                modality: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationModality must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationName must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationSourceApplicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sourceApplicationId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationSourceApplicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationApiInterfaceTypeId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                apiInterfaceTypeId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationApiInterfaceTypeId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationModality property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                modality: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationModality must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationSourceApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sourceApplicationId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationSourceApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationTargetApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                targetApplicationId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationTargetApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationApiInterfaceTypeId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                apiInterfaceTypeId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationApiInterfaceTypeId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationInterfaceNumbers is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                interfaceNumbers: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationInterfaceNumbers is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationScore is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationInterfaceNumbers must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                interfaceNumbers: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationIntegrationInterfaceNumbers must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST app-health/application-integration/create - Got 400 Conflict, ApplicationIntegrationModality has to be a enum option of UNIDIRECTIONAL, BIDIRECTIONAL', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                modality: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIntegrationModality has to be any of this options: UNIDIRECTIONAL, BIDIRECTIONAL');
            });
    });

    test('/REST:POST app-health/application-integration/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/application-integrations/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integrations/paginate')
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
                    total: applicationIntegrationSeeder.collectionResponse.length,
                    count: applicationIntegrationSeeder.collectionResponse.length,
                    rows : applicationIntegrationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/application-integrations/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integrations/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    applicationIntegrationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/application-integration/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '0cb1498e-d029-541b-b135-9e0cda35c7e8',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/application-integration/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/application-integration/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/find')
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

    test('/REST:POST app-health/application-integration/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/find/b36f24f2-721a-5a98-8ac5-a7eb1c0d5a92')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/application-integration/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-integration/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/application-integration/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-integration/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'f5a8c4d8-da0c-57e9-8960-39fdd5ae5c3a',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/application-integration/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-integration/update')
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

    test('/REST:DELETE app-health/application-integration/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-integration/delete/33480fbc-8845-56da-950a-65ee7ef0078e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/application-integration/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-integration/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateApplicationIntegration - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationIntegrationInput!)
                    {
                        appHealthCreateApplicationIntegration (payload:$payload)
                        {
                            id
                            name
                            description
                            sourceApplicationId
                            targetApplicationId
                            apiInterfaceTypeId
                            interfaceNumbers
                            modality
                            score
                            documentations
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

    test('/GraphQL appHealthPaginateApplicationIntegrations', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateApplicationIntegrations (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateApplicationIntegrations).toEqual({
                    total: applicationIntegrationSeeder.collectionResponse.length,
                    count: applicationIntegrationSeeder.collectionResponse.length,
                    rows : applicationIntegrationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetApplicationIntegrations', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetApplicationIntegrations (query:$query)
                        {
                            id
                            name
                            description
                            interfaceNumbers
                            modality
                            score
                            documentations
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
                for (const [index, value] of res.body.data.appHealthGetApplicationIntegrations.entries())
                {
                    expect(applicationIntegrationSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateApplicationIntegration', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationIntegrationInput!)
                    {
                        appHealthCreateApplicationIntegration (payload:$payload)
                        {
                            id
                            name
                            description
                            sourceApplicationId
                            targetApplicationId
                            apiInterfaceTypeId
                            interfaceNumbers
                            modality
                            score
                            documentations
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
                expect(res.body.data.appHealthCreateApplicationIntegration).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationIntegration - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationIntegration (query:$query)
                        {
                            id
                            name
                            description
                            interfaceNumbers
                            modality
                            score
                            documentations
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
                            id: '4b864b43-e899-53f5-b20c-1d2e8c5bc073',
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

    test('/GraphQL appHealthFindApplicationIntegration', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationIntegration (query:$query)
                        {
                            id
                            name
                            description
                            interfaceNumbers
                            modality
                            score
                            documentations
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
                expect(res.body.data.appHealthFindApplicationIntegration.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationIntegrationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationIntegrationById (id:$id)
                        {
                            id
                            name
                            description
                            interfaceNumbers
                            modality
                            score
                            documentations
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1e057bee-9319-5ace-b801-6f96cdd0622b',
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

    test('/GraphQL appHealthFindApplicationIntegrationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationIntegrationById (id:$id)
                        {
                            id
                            name
                            description
                            interfaceNumbers
                            modality
                            score
                            documentations
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
                expect(res.body.data.appHealthFindApplicationIntegrationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationIntegrationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationIntegrationByIdInput!)
                    {
                        appHealthUpdateApplicationIntegrationById (payload:$payload)
                        {
                            id
                            name
                            description
                            interfaceNumbers
                            modality
                            score
                            documentations
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'f2df2283-2420-5c2c-b6e2-737bc0b419cb',
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

    test('/GraphQL appHealthUpdateApplicationIntegrationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationIntegrationByIdInput!)
                    {
                        appHealthUpdateApplicationIntegrationById (payload:$payload)
                        {
                            id
                            name
                            description
                            interfaceNumbers
                            modality
                            score
                            documentations
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
                expect(res.body.data.appHealthUpdateApplicationIntegrationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationIntegrations', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationIntegrationsInput! $query: QueryStatement)
                    {
                        appHealthUpdateApplicationIntegrations (payload:$payload query:$query)
                        {
                            id
                            name
                            description
                            interfaceNumbers
                            modality
                            score
                            documentations
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
                expect(res.body.data.appHealthUpdateApplicationIntegrations[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteApplicationIntegrationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationIntegrationById (id:$id)
                        {
                            id
                            name
                            description
                            interfaceNumbers
                            modality
                            score
                            documentations
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '372d881f-4a20-5079-87a3-dc4e543e8b83',
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

    test('/GraphQL appHealthDeleteApplicationIntegrationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationIntegrationById (id:$id)
                        {
                            id
                            name
                            description
                            interfaceNumbers
                            modality
                            score
                            documentations
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
                expect(res.body.data.appHealthDeleteApplicationIntegrationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await applicationIntegrationRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});