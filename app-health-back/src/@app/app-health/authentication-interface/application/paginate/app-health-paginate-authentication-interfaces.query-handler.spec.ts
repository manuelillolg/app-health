import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { AppHealthPaginateAuthenticationInterfacesQueryHandler } from './app-health-paginate-authentication-interfaces.query-handler';
import { AppHealthMockAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.repository';
import { AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface/domain/app-health-authentication-interface.repository';
import { AppHealthAuthenticationInterfaceMapper } from '@app/app-health/authentication-interface/domain/app-health-authentication-interface.mapper';
import { AppHealthPaginateAuthenticationInterfacesQuery } from './app-health-paginate-authentication-interfaces.query';
import { AppHealthPaginateAuthenticationInterfacesService } from './app-health-paginate-authentication-interfaces.service';

describe('AppHealthPaginateAuthenticationInterfacesQueryHandler', () =>
{
    let queryHandler: AppHealthPaginateAuthenticationInterfacesQueryHandler;
    let service: AppHealthPaginateAuthenticationInterfacesService;
    let repository: AppHealthMockAuthenticationInterfaceRepository;
    let mapper: AppHealthAuthenticationInterfaceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthPaginateAuthenticationInterfacesQueryHandler,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useClass: AppHealthMockAuthenticationInterfaceRepository,
                },
                {
                    provide : AppHealthPaginateAuthenticationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthPaginateAuthenticationInterfacesQueryHandler>(AppHealthPaginateAuthenticationInterfacesQueryHandler);
        service = module.get<AppHealthPaginateAuthenticationInterfacesService>(AppHealthPaginateAuthenticationInterfacesService);
        repository = <AppHealthMockAuthenticationInterfaceRepository>module.get<AppHealthIAuthenticationInterfaceRepository>(AppHealthIAuthenticationInterfaceRepository);
        mapper = new AppHealthAuthenticationInterfaceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateAuthenticationInterfacesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authenticationInterfaces paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new AppHealthPaginateAuthenticationInterfacesQuery(
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
