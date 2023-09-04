import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindAuthorizationInterfaceByIdQueryHandler } from './app-health-find-authorization-interface-by-id.query-handler';
import { AppHealthMockAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.repository';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.data';
import { AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface/domain/app-health-authorization-interface.repository';
import { AppHealthAuthorizationInterfaceMapper } from '@app/app-health/authorization-interface/domain/app-health-authorization-interface.mapper';
import { AppHealthFindAuthorizationInterfaceByIdQuery } from './app-health-find-authorization-interface-by-id.query';
import { AppHealthFindAuthorizationInterfaceByIdService } from './app-health-find-authorization-interface-by-id.service';

describe('AppHealthFindAuthorizationInterfaceByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindAuthorizationInterfaceByIdQueryHandler;
    let service: AppHealthFindAuthorizationInterfaceByIdService;
    let repository: AppHealthMockAuthorizationInterfaceRepository;
    let mapper: AppHealthAuthorizationInterfaceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindAuthorizationInterfaceByIdQueryHandler,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useClass: AppHealthMockAuthorizationInterfaceRepository,
                },
                {
                    provide : AppHealthFindAuthorizationInterfaceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindAuthorizationInterfaceByIdQueryHandler>(AppHealthFindAuthorizationInterfaceByIdQueryHandler);
        service = module.get<AppHealthFindAuthorizationInterfaceByIdService>(AppHealthFindAuthorizationInterfaceByIdService);
        repository = <AppHealthMockAuthorizationInterfaceRepository>module.get<AppHealthIAuthorizationInterfaceRepository>(AppHealthIAuthorizationInterfaceRepository);
        mapper = new AppHealthAuthorizationInterfaceMapper();
    });

    describe('main', () =>
    {
        test('FindAuthorizationInterfaceByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authorizationInterface founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindAuthorizationInterfaceByIdQuery(
                    appHealthMockAuthorizationInterfaceData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
