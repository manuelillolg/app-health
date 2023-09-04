import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface/infrastructure/mock/app-health-mock-authorization-interface.repository';
import { AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface/domain/app-health-authorization-interface.repository';
import { AppHealthAuthorizationInterfaceMapper } from '@app/app-health/authorization-interface/domain/app-health-authorization-interface.mapper';
import { AppHealthRawSQLAuthorizationInterfacesQueryHandler } from './app-health-raw-sql-authorization-interfaces.query-handler';
import { AppHealthRawSQLAuthorizationInterfacesQuery } from './app-health-raw-sql-authorization-interfaces.query';
import { AppHealthRawSQLAuthorizationInterfacesService } from './app-health-raw-sql-authorization-interfaces.service';

describe('RawSQLAuthorizationInterfacesQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLAuthorizationInterfacesQueryHandler;
    let service: AppHealthRawSQLAuthorizationInterfacesService;
    let repository: AppHealthMockAuthorizationInterfaceRepository;
    let mapper: AppHealthAuthorizationInterfaceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLAuthorizationInterfacesQueryHandler,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useClass: AppHealthMockAuthorizationInterfaceRepository,
                },
                {
                    provide : AppHealthRawSQLAuthorizationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLAuthorizationInterfacesQueryHandler>(AppHealthRawSQLAuthorizationInterfacesQueryHandler);
        service = module.get<AppHealthRawSQLAuthorizationInterfacesService>(AppHealthRawSQLAuthorizationInterfacesService);
        repository = <AppHealthMockAuthorizationInterfaceRepository>module.get<AppHealthIAuthorizationInterfaceRepository>(AppHealthIAuthorizationInterfaceRepository);
        mapper = new AppHealthAuthorizationInterfaceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLAuthorizationInterfacesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authorizationInterfaces founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLAuthorizationInterfacesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
