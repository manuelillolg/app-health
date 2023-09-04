/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIApplicationRepository, appHealthMockApplicationData, AppHealthMockApplicationSeeder } from '@app/app-health/application';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('application', () =>
{
    let app: INestApplication;
    let applicationRepository: AppHealthIApplicationRepository;
    let applicationSeeder: AppHealthMockApplicationSeeder;

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
                AppHealthMockApplicationSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockApplicationData;
        app = module.createNestApplication();
        applicationRepository = module.get<AppHealthIApplicationRepository>(AppHealthIApplicationRepository);
        applicationSeeder = module.get<AppHealthMockApplicationSeeder>(AppHealthMockApplicationSeeder);

        // seed mock data in memory database
        await applicationRepository.insert(applicationSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationTechnicalSolutionId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                technicalSolutionId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationTechnicalSolutionId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationType must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationHasTenants property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                hasTenants: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationHasTenants must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationHasLicensing property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                hasLicensing: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationHasLicensing must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationTechnicalSolutionId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                technicalSolutionId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationTechnicalSolutionId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationType must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationHasTenants property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                hasTenants: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationHasTenants must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationHasLicensing property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                hasLicensing: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationHasLicensing must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationTechnicalSolutionId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                technicalSolutionId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationTechnicalSolutionId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationArchitectureDiagram is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                architectureDiagram: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationArchitectureDiagram is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationCostLicensesPerYear is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                costLicensesPerYear: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationCostLicensesPerYear is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationRequestsPerDay is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                requestsPerDay: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationRequestsPerDay is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationCostLicensesPerYear must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                costLicensesPerYear: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationCostLicensesPerYear must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationRequestsPerDay must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                requestsPerDay: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationRequestsPerDay must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationHasTenants has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                hasTenants: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationHasTenants has to be a boolean value');
            });
    });
    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationHasLicensing has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                hasLicensing: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationHasLicensing has to be a boolean value');
            });
    });
    test('/REST:POST app-health/application/create - Got 400 Conflict, ApplicationType has to be a enum option of FRONTEND, SERVER, MOBILE, EMBEDDED', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationType has to be any of this options: FRONTEND, SERVER, MOBILE, EMBEDDED');
            });
    });

    test('/REST:POST app-health/application/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/applications/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/applications/paginate')
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
                    total: applicationSeeder.collectionResponse.length,
                    count: applicationSeeder.collectionResponse.length,
                    rows : applicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/applications/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/applications/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    applicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/application/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'f102f062-a50a-546f-88c0-58b3bcd8b3c9',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/application/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/application/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/find')
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

    test('/REST:POST app-health/application/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/find/aa3361cc-ffb4-5bda-a493-725409878cfe')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/application/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/application/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'd6331dad-575f-5c43-9493-5d0e3ffa93c1',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/application/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application/update')
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

    test('/REST:DELETE app-health/application/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application/delete/86ce9008-14ba-520c-95db-6e86308db0c9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/application/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateApplication - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationInput!)
                    {
                        appHealthCreateApplication (payload:$payload)
                        {
                            id
                            technicalSolutionId
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
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

    test('/GraphQL appHealthPaginateApplications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateApplications).toEqual({
                    total: applicationSeeder.collectionResponse.length,
                    count: applicationSeeder.collectionResponse.length,
                    rows : applicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetApplications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetApplications (query:$query)
                        {
                            id
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
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
                for (const [index, value] of res.body.data.appHealthGetApplications.entries())
                {
                    expect(applicationSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateApplication', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationInput!)
                    {
                        appHealthCreateApplication (payload:$payload)
                        {
                            id
                            technicalSolutionId
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
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
                expect(res.body.data.appHealthCreateApplication).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplication - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplication (query:$query)
                        {
                            id
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
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
                            id: '4c4d7921-718d-58a7-a362-7ba31b1513e2',
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

    test('/GraphQL appHealthFindApplication', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplication (query:$query)
                        {
                            id
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
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
                expect(res.body.data.appHealthFindApplication.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationById (id:$id)
                        {
                            id
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3f5f2ba9-d33b-52a5-99b0-9472c29ed51f',
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

    test('/GraphQL appHealthFindApplicationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationById (id:$id)
                        {
                            id
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
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
                expect(res.body.data.appHealthFindApplicationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationByIdInput!)
                    {
                        appHealthUpdateApplicationById (payload:$payload)
                        {
                            id
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '80e25ffc-f4e3-5cb8-87f0-98e5a4da9807',
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

    test('/GraphQL appHealthUpdateApplicationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationByIdInput!)
                    {
                        appHealthUpdateApplicationById (payload:$payload)
                        {
                            id
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
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
                expect(res.body.data.appHealthUpdateApplicationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationsInput! $query: QueryStatement)
                    {
                        appHealthUpdateApplications (payload:$payload query:$query)
                        {
                            id
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
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
                expect(res.body.data.appHealthUpdateApplications[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteApplicationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationById (id:$id)
                        {
                            id
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7bf5288b-bd79-5f27-a666-5896ada4cd5e',
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

    test('/GraphQL appHealthDeleteApplicationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationById (id:$id)
                        {
                            id
                            name
                            description
                            businessImpact
                            type
                            releaseDate
                            architectureDiagram
                            hasTenants
                            hasLicensing
                            costLicensesPerYear
                            requestsPerDay
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
                expect(res.body.data.appHealthDeleteApplicationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await applicationRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});