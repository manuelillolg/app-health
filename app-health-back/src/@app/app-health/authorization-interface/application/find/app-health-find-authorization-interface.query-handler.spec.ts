import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindAuthorizationInterfaceQueryHandler } from './app-health-find-authorization-interface.query-handler';
import { AppHealthMockAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.repository';
import { AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface/domain/app-health-authorization-interface.repository';
import { AppHealthAuthorizationInterfaceMapper } from '@app/app-health/authorization-interface/domain/app-health-authorization-interface.mapper';
import { AppHealthFindAuthorizationInterfaceQuery } from './app-health-find-authorization-interface.query';
import { AppHealthFindAuthorizationInterfaceService } from './app-health-find-authorization-interface.service';

describe('AppHealthFindAuthorizationInterfaceQueryHandler', () =>
{
    let queryHandler: AppHealthFindAuthorizationInterfaceQueryHandler;
    let service: AppHealthFindAuthorizationInterfaceService;
    let repository: AppHealthMockAuthorizationInterfaceRepository;
    let mapper: AppHealthAuthorizationInterfaceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindAuthorizationInterfaceQueryHandler,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useClass: AppHealthMockAuthorizationInterfaceRepository,
                },
                {
                    provide : AppHealthFindAuthorizationInterfaceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindAuthorizationInterfaceQueryHandler>(AppHealthFindAuthorizationInterfaceQueryHandler);
        service = module.get<AppHealthFindAuthorizationInterfaceService>(AppHealthFindAuthorizationInterfaceService);
        repository = <AppHealthMockAuthorizationInterfaceRepository>module.get<AppHealthIAuthorizationInterfaceRepository>(AppHealthIAuthorizationInterfaceRepository);
        mapper = new AppHealthAuthorizationInterfaceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthorizationInterfaceQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authorizationInterface founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindAuthorizationInterfaceQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
