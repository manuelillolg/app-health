import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindAuthenticationInterfaceByIdQueryHandler } from './app-health-find-authentication-interface-by-id.query-handler';
import { AppHealthMockAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.repository';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.data';
import { AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface/domain/app-health-authentication-interface.repository';
import { AppHealthAuthenticationInterfaceMapper } from '@app/app-health/authentication-interface/domain/app-health-authentication-interface.mapper';
import { AppHealthFindAuthenticationInterfaceByIdQuery } from './app-health-find-authentication-interface-by-id.query';
import { AppHealthFindAuthenticationInterfaceByIdService } from './app-health-find-authentication-interface-by-id.service';

describe('AppHealthFindAuthenticationInterfaceByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindAuthenticationInterfaceByIdQueryHandler;
    let service: AppHealthFindAuthenticationInterfaceByIdService;
    let repository: AppHealthMockAuthenticationInterfaceRepository;
    let mapper: AppHealthAuthenticationInterfaceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindAuthenticationInterfaceByIdQueryHandler,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useClass: AppHealthMockAuthenticationInterfaceRepository,
                },
                {
                    provide : AppHealthFindAuthenticationInterfaceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindAuthenticationInterfaceByIdQueryHandler>(AppHealthFindAuthenticationInterfaceByIdQueryHandler);
        service = module.get<AppHealthFindAuthenticationInterfaceByIdService>(AppHealthFindAuthenticationInterfaceByIdService);
        repository = <AppHealthMockAuthenticationInterfaceRepository>module.get<AppHealthIAuthenticationInterfaceRepository>(AppHealthIAuthenticationInterfaceRepository);
        mapper = new AppHealthAuthenticationInterfaceMapper();
    });

    describe('main', () =>
    {
        test('FindAuthenticationInterfaceByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authenticationInterface founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindAuthenticationInterfaceByIdQuery(
                    appHealthMockAuthenticationInterfaceData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
