import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetAuthorizationInterfacesQueryHandler } from './app-health-get-authorization-interfaces.query-handler';
import { AppHealthMockAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.repository';
import { AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface/domain/app-health-authorization-interface.repository';
import { AppHealthAuthorizationInterfaceMapper } from '@app/app-health/authorization-interface/domain/app-health-authorization-interface.mapper';
import { AppHealthGetAuthorizationInterfacesQuery } from './app-health-get-authorization-interfaces.query';
import { AppHealthGetAuthorizationInterfacesService } from './app-health-get-authorization-interfaces.service';

describe('GetAuthorizationInterfacesQueryHandler', () =>
{
    let queryHandler: AppHealthGetAuthorizationInterfacesQueryHandler;
    let service: AppHealthGetAuthorizationInterfacesService;
    let repository: AppHealthMockAuthorizationInterfaceRepository;
    let mapper: AppHealthAuthorizationInterfaceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetAuthorizationInterfacesQueryHandler,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useClass: AppHealthMockAuthorizationInterfaceRepository,
                },
                {
                    provide : AppHealthGetAuthorizationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetAuthorizationInterfacesQueryHandler>(AppHealthGetAuthorizationInterfacesQueryHandler);
        service = module.get<AppHealthGetAuthorizationInterfacesService>(AppHealthGetAuthorizationInterfacesService);
        repository = <AppHealthMockAuthorizationInterfaceRepository>module.get<AppHealthIAuthorizationInterfaceRepository>(AppHealthIAuthorizationInterfaceRepository);
        mapper = new AppHealthAuthorizationInterfaceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetAuthorizationInterfacesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authorizationInterfaces founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetAuthorizationInterfacesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});