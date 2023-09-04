import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindAuthenticationInterfaceQueryHandler } from './app-health-find-authentication-interface.query-handler';
import { AppHealthMockAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.repository';
import { AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface/domain/app-health-authentication-interface.repository';
import { AppHealthAuthenticationInterfaceMapper } from '@app/app-health/authentication-interface/domain/app-health-authentication-interface.mapper';
import { AppHealthFindAuthenticationInterfaceQuery } from './app-health-find-authentication-interface.query';
import { AppHealthFindAuthenticationInterfaceService } from './app-health-find-authentication-interface.service';

describe('AppHealthFindAuthenticationInterfaceQueryHandler', () =>
{
    let queryHandler: AppHealthFindAuthenticationInterfaceQueryHandler;
    let service: AppHealthFindAuthenticationInterfaceService;
    let repository: AppHealthMockAuthenticationInterfaceRepository;
    let mapper: AppHealthAuthenticationInterfaceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindAuthenticationInterfaceQueryHandler,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useClass: AppHealthMockAuthenticationInterfaceRepository,
                },
                {
                    provide : AppHealthFindAuthenticationInterfaceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindAuthenticationInterfaceQueryHandler>(AppHealthFindAuthenticationInterfaceQueryHandler);
        service = module.get<AppHealthFindAuthenticationInterfaceService>(AppHealthFindAuthenticationInterfaceService);
        repository = <AppHealthMockAuthenticationInterfaceRepository>module.get<AppHealthIAuthenticationInterfaceRepository>(AppHealthIAuthenticationInterfaceRepository);
        mapper = new AppHealthAuthenticationInterfaceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindAuthenticationInterfaceQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authenticationInterface founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindAuthenticationInterfaceQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
