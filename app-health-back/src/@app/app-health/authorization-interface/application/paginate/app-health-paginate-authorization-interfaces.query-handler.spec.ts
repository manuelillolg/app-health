import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateAuthorizationInterfacesQueryHandler } from './app-health-paginate-authorization-interfaces.query-handler';
import { AppHealthMockAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.repository';
import { AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface/domain/app-health-authorization-interface.repository';
import { AppHealthAuthorizationInterfaceMapper } from '@app/app-health/authorization-interface/domain/app-health-authorization-interface.mapper';
import { AppHealthPaginateAuthorizationInterfacesQuery } from './app-health-paginate-authorization-interfaces.query';
import { AppHealthPaginateAuthorizationInterfacesService } from './app-health-paginate-authorization-interfaces.service';

describe('AppHealthPaginateAuthorizationInterfacesQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateAuthorizationInterfacesQueryHandler;
    let service: AppHealthPaginateAuthorizationInterfacesService;
    let repository: AppHealthMockAuthorizationInterfaceRepository;
    let mapper: AppHealthAuthorizationInterfaceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateAuthorizationInterfacesQueryHandler,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useClass: AppHealthMockAuthorizationInterfaceRepository,
                },
                {
                    provide : AppHealthPaginateAuthorizationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateAuthorizationInterfacesQueryHandler>(AppHealthPaginateAuthorizationInterfacesQueryHandler);
        service = module.get<AppHealthPaginateAuthorizationInterfacesService>(AppHealthPaginateAuthorizationInterfacesService);
        repository = <AppHealthMockAuthorizationInterfaceRepository>module.get<AppHealthIAuthorizationInterfaceRepository>(AppHealthIAuthorizationInterfaceRepository);
        mapper = new AppHealthAuthorizationInterfaceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateAuthorizationInterfacesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authorizationInterfaces paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateAuthorizationInterfacesQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
