/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIApplicationInfrastructureServiceRepository, appHealthMockApplicationInfrastructureServiceData, AppHealthMockApplicationInfrastructureServiceSeeder } from '@app/app-health/application-infrastructure-service';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('application-infrastructure-service', () =>
{
    let app: INestApplication;
    let applicationInfrastructureServiceRepository: AppHealthIApplicationInfrastructureServiceRepository;
    let applicationInfrastructureServiceSeeder: AppHealthMockApplicationInfrastructureServiceSeeder;

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
                AppHealthMockApplicationInfrastructureServiceSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockApplicationInfrastructureServiceData;
        app = module.createNestApplication();
        applicationInfrastructureServiceRepository = module.get<AppHealthIApplicationInfrastructureServiceRepository>(AppHealthIApplicationInfrastructureServiceRepository);
        applicationInfrastructureServiceSeeder = module.get<AppHealthMockApplicationInfrastructureServiceSeeder>(AppHealthMockApplicationInfrastructureServiceSeeder);

        // seed mock data in memory database
        await applicationInfrastructureServiceRepository.insert(applicationInfrastructureServiceSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceApplicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceApplicationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceInfrastructureServiceId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                infrastructureServiceId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceInfrastructureServiceId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceApplicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceApplicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceInfrastructureServiceId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                infrastructureServiceId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceInfrastructureServiceId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceInfrastructureServiceId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                infrastructureServiceId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceInfrastructureServiceId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceAverageCostPerYear is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                averageCostPerYear: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceAverageCostPerYear is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationInfrastructureServiceScore is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 400 Conflict, ApplicationInfrastructureServiceAverageCostPerYear must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                averageCostPerYear: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationInfrastructureServiceAverageCostPerYear must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/application-infrastucture-services/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastucture-services/paginate')
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
                    total: applicationInfrastructureServiceSeeder.collectionResponse.length,
                    count: applicationInfrastructureServiceSeeder.collectionResponse.length,
                    rows : applicationInfrastructureServiceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/application-infrastucture-services/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastucture-services/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    applicationInfrastructureServiceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/application-infrastructure-service/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'be1b85ae-9f5e-5a5c-9692-7975609a1d24',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/application-infrastructure-service/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/application-infrastructure-service/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/find')
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

    test('/REST:POST app-health/application-infrastructure-service/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/find/04910816-1942-5947-988a-d1b5573d7a17')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/application-infrastructure-service/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-infrastructure-service/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/application-infrastructure-service/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-infrastructure-service/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '4d8c6305-6813-596c-beb7-f036c41f5191',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/application-infrastructure-service/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-infrastructure-service/update')
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

    test('/REST:DELETE app-health/application-infrastructure-service/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-infrastructure-service/delete/5e77719c-c726-53d9-bae4-8ae5a69618d9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/application-infrastructure-service/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-infrastructure-service/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateApplicationInfrastructureService - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationInfrastructureServiceInput!)
                    {
                        appHealthCreateApplicationInfrastructureService (payload:$payload)
                        {
                            id
                            applicationId
                            infrastructureServiceId
                            averageCostPerYear
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

    test('/GraphQL appHealthPaginateApplicationInfrastuctureServices', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateApplicationInfrastuctureServices (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateApplicationInfrastuctureServices).toEqual({
                    total: applicationInfrastructureServiceSeeder.collectionResponse.length,
                    count: applicationInfrastructureServiceSeeder.collectionResponse.length,
                    rows : applicationInfrastructureServiceSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetApplicationInfrastuctureServices', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetApplicationInfrastuctureServices (query:$query)
                        {
                            id
                            averageCostPerYear
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
                for (const [index, value] of res.body.data.appHealthGetApplicationInfrastuctureServices.entries())
                {
                    expect(applicationInfrastructureServiceSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateApplicationInfrastructureService', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationInfrastructureServiceInput!)
                    {
                        appHealthCreateApplicationInfrastructureService (payload:$payload)
                        {
                            id
                            applicationId
                            infrastructureServiceId
                            averageCostPerYear
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
                expect(res.body.data.appHealthCreateApplicationInfrastructureService).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationInfrastructureService - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationInfrastructureService (query:$query)
                        {
                            id
                            averageCostPerYear
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
                            id: '21339f8c-c80e-51d0-a291-8eb40ecb601a',
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

    test('/GraphQL appHealthFindApplicationInfrastructureService', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationInfrastructureService (query:$query)
                        {
                            id
                            averageCostPerYear
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
                expect(res.body.data.appHealthFindApplicationInfrastructureService.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationInfrastructureServiceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationInfrastructureServiceById (id:$id)
                        {
                            id
                            averageCostPerYear
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '736bb01a-733c-54f3-bf7b-b702d252e32e',
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

    test('/GraphQL appHealthFindApplicationInfrastructureServiceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationInfrastructureServiceById (id:$id)
                        {
                            id
                            averageCostPerYear
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
                expect(res.body.data.appHealthFindApplicationInfrastructureServiceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationInfrastructureServiceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationInfrastructureServiceByIdInput!)
                    {
                        appHealthUpdateApplicationInfrastructureServiceById (payload:$payload)
                        {
                            id
                            averageCostPerYear
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '0513c018-79eb-5959-920b-d854959838db',
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

    test('/GraphQL appHealthUpdateApplicationInfrastructureServiceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationInfrastructureServiceByIdInput!)
                    {
                        appHealthUpdateApplicationInfrastructureServiceById (payload:$payload)
                        {
                            id
                            averageCostPerYear
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
                expect(res.body.data.appHealthUpdateApplicationInfrastructureServiceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationInfrastuctureServices', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationInfrastuctureServicesInput! $query: QueryStatement)
                    {
                        appHealthUpdateApplicationInfrastuctureServices (payload:$payload query:$query)
                        {
                            id
                            averageCostPerYear
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
                expect(res.body.data.appHealthUpdateApplicationInfrastuctureServices[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteApplicationInfrastructureServiceById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationInfrastructureServiceById (id:$id)
                        {
                            id
                            averageCostPerYear
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '26e43f6a-8ce4-51f3-b411-7b8525cc2746',
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

    test('/GraphQL appHealthDeleteApplicationInfrastructureServiceById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationInfrastructureServiceById (id:$id)
                        {
                            id
                            averageCostPerYear
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
                expect(res.body.data.appHealthDeleteApplicationInfrastructureServiceById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await applicationInfrastructureServiceRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});