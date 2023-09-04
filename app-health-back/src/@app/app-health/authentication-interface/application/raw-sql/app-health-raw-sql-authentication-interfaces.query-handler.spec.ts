import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthMockAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.repository';
import { AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface/domain/app-health-authentication-interface.repository';
import { AppHealthAuthenticationInterfaceMapper } from '@app/app-health/authentication-interface/domain/app-health-authentication-interface.mapper';
import { AppHealthRawSQLAuthenticationInterfacesQueryHandler } from './app-health-raw-sql-authentication-interfaces.query-handler';
import { AppHealthRawSQLAuthenticationInterfacesQuery } from './app-health-raw-sql-authentication-interfaces.query';
import { AppHealthRawSQLAuthenticationInterfacesService } from './app-health-raw-sql-authentication-interfaces.service';

describe('RawSQLAuthenticationInterfacesQueryHandler', () =>
{
    let queryHandler: AppHealthRawSQLAuthenticationInterfacesQueryHandler;
    let service: AppHealthRawSQLAuthenticationInterfacesService;
    let repository: AppHealthMockAuthenticationInterfaceRepository;
    let mapper: AppHealthAuthenticationInterfaceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthRawSQLAuthenticationInterfacesQueryHandler,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useClass: AppHealthMockAuthenticationInterfaceRepository,
                },
                {
                    provide : AppHealthRawSQLAuthenticationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthRawSQLAuthenticationInterfacesQueryHandler>(AppHealthRawSQLAuthenticationInterfacesQueryHandler);
        service = module.get<AppHealthRawSQLAuthenticationInterfacesService>(AppHealthRawSQLAuthenticationInterfacesService);
        repository = <AppHealthMockAuthenticationInterfaceRepository>module.get<AppHealthIAuthenticationInterfaceRepository>(AppHealthIAuthenticationInterfaceRepository);
        mapper = new AppHealthAuthenticationInterfaceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthRawSQLAuthenticationInterfacesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authenticationInterfaces founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthRawSQLAuthenticationInterfacesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
