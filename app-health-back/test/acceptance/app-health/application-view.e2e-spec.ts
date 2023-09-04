/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AppHealthModule } from '@api/app-health/app-health.module';
import { AppHealthIApplicationViewRepository, appHealthMockApplicationViewData, AppHealthMockApplicationViewSeeder } from '@app/app-health/application-view';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('application-view', () =>
{
    let app: INestApplication;
    let applicationViewRepository: AppHealthIApplicationViewRepository;
    let applicationViewSeeder: AppHealthMockApplicationViewSeeder;

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
                AppHealthMockApplicationViewSeeder,
            ],
        })
            .compile();

        mockData = appHealthMockApplicationViewData;
        app = module.createNestApplication();
        applicationViewRepository = module.get<AppHealthIApplicationViewRepository>(AppHealthIApplicationViewRepository);
        applicationViewSeeder = module.get<AppHealthMockApplicationViewSeeder>(AppHealthMockApplicationViewSeeder);

        // seed mock data in memory database
        await applicationViewRepository.insert(applicationViewSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewApplicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewApplicationId must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewTotalViews property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalViews: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewTotalViews must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewComplexity property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                complexity: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewComplexity must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewScore property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewScore must be defined, can not be null');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewApplicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewApplicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewTotalViews property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalViews: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewTotalViews must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewComplexity property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                complexity: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewComplexity must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewScore property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewScore must be defined, can not be undefined');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                applicationId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewTotalViews is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalViews: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewTotalViews is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewComplexity is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                complexity: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewComplexity is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewDescription is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                description: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewDescription is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewScore is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                score: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationViewScore is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 400 Conflict, ApplicationViewTotalViews must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalViews: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ApplicationViewTotalViews must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST app-health/application-view/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST app-health/application-views/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-views/paginate')
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
                    total: applicationViewSeeder.collectionResponse.length,
                    count: applicationViewSeeder.collectionResponse.length,
                    rows : applicationViewSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST app-health/application-views/get', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-views/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    applicationViewSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST app-health/application-view/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '1a62784a-6d5d-5d5c-8b93-21857042ef50',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST app-health/application-view/create', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST app-health/application-view/find', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/find')
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

    test('/REST:POST app-health/application-view/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/find/a977c005-ac87-5598-8729-166b738dec94')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST app-health/application-view/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/app-health/application-view/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT app-health/application-view/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-view/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'c2ff43b8-073d-5b30-890f-db410e9dd5df',
            })
            .expect(404);
    });

    test('/REST:PUT app-health/application-view/update', () =>
    {
        return request(app.getHttpServer())
            .put('/app-health/application-view/update')
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

    test('/REST:DELETE app-health/application-view/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-view/delete/bee53a6e-e7ff-5ed3-82a5-f9f6354459af')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE app-health/application-view/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/app-health/application-view/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL appHealthCreateApplicationView - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationViewInput!)
                    {
                        appHealthCreateApplicationView (payload:$payload)
                        {
                            id
                            applicationId
                            totalViews
                            complexity
                            description
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

    test('/GraphQL appHealthPaginateApplicationViews', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        appHealthPaginateApplicationViews (query:$query constraint:$constraint)
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
                expect(res.body.data.appHealthPaginateApplicationViews).toEqual({
                    total: applicationViewSeeder.collectionResponse.length,
                    count: applicationViewSeeder.collectionResponse.length,
                    rows : applicationViewSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL appHealthGetApplicationViews', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthGetApplicationViews (query:$query)
                        {
                            id
                            totalViews
                            complexity
                            description
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
                for (const [index, value] of res.body.data.appHealthGetApplicationViews.entries())
                {
                    expect(applicationViewSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL appHealthCreateApplicationView', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthCreateApplicationViewInput!)
                    {
                        appHealthCreateApplicationView (payload:$payload)
                        {
                            id
                            applicationId
                            totalViews
                            complexity
                            description
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
                expect(res.body.data.appHealthCreateApplicationView).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationView - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationView (query:$query)
                        {
                            id
                            totalViews
                            complexity
                            description
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
                            id: '1c1ca42f-a906-5a08-ab12-63d443695fe0',
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

    test('/GraphQL appHealthFindApplicationView', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        appHealthFindApplicationView (query:$query)
                        {
                            id
                            totalViews
                            complexity
                            description
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
                expect(res.body.data.appHealthFindApplicationView.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthFindApplicationViewById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationViewById (id:$id)
                        {
                            id
                            totalViews
                            complexity
                            description
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f92cd234-58e8-54ff-868e-9df0f8bc6c75',
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

    test('/GraphQL appHealthFindApplicationViewById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        appHealthFindApplicationViewById (id:$id)
                        {
                            id
                            totalViews
                            complexity
                            description
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
                expect(res.body.data.appHealthFindApplicationViewById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationViewById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationViewByIdInput!)
                    {
                        appHealthUpdateApplicationViewById (payload:$payload)
                        {
                            id
                            totalViews
                            complexity
                            description
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '44e59114-760f-58da-ad55-6f4289bfe597',
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

    test('/GraphQL appHealthUpdateApplicationViewById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationViewByIdInput!)
                    {
                        appHealthUpdateApplicationViewById (payload:$payload)
                        {
                            id
                            totalViews
                            complexity
                            description
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
                expect(res.body.data.appHealthUpdateApplicationViewById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthUpdateApplicationViews', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AppHealthUpdateApplicationViewsInput! $query: QueryStatement)
                    {
                        appHealthUpdateApplicationViews (payload:$payload query:$query)
                        {
                            id
                            totalViews
                            complexity
                            description
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
                expect(res.body.data.appHealthUpdateApplicationViews[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL appHealthDeleteApplicationViewById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationViewById (id:$id)
                        {
                            id
                            totalViews
                            complexity
                            description
                            score
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8c92316d-89ee-59b8-a192-3da921a80c3b',
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

    test('/GraphQL appHealthDeleteApplicationViewById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        appHealthDeleteApplicationViewById (id:$id)
                        {
                            id
                            totalViews
                            complexity
                            description
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
                expect(res.body.data.appHealthDeleteApplicationViewById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await applicationViewRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});