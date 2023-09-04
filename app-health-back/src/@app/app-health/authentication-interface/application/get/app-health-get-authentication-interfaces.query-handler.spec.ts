import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthGetAuthenticationInterfacesQueryHandler } from './app-health-get-authentication-interfaces.query-handler';
import { AppHealthMockAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.repository';
import { AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface/domain/app-health-authentication-interface.repository';
import { AppHealthAuthenticationInterfaceMapper } from '@app/app-health/authentication-interface/domain/app-health-authentication-interface.mapper';
import { AppHealthGetAuthenticationInterfacesQuery } from './app-health-get-authentication-interfaces.query';
import { AppHealthGetAuthenticationInterfacesService } from './app-health-get-authentication-interfaces.service';

describe('GetAuthenticationInterfacesQueryHandler', () =>
{
    let queryHandler: AppHealthGetAuthenticationInterfacesQueryHandler;
    let service: AppHealthGetAuthenticationInterfacesService;
    let repository: AppHealthMockAuthenticationInterfaceRepository;
    let mapper: AppHealthAuthenticationInterfaceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthGetAuthenticationInterfacesQueryHandler,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useClass: AppHealthMockAuthenticationInterfaceRepository,
                },
                {
                    provide : AppHealthGetAuthenticationInterfacesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthGetAuthenticationInterfacesQueryHandler>(AppHealthGetAuthenticationInterfacesQueryHandler);
        service = module.get<AppHealthGetAuthenticationInterfacesService>(AppHealthGetAuthenticationInterfacesService);
        repository = <AppHealthMockAuthenticationInterfaceRepository>module.get<AppHealthIAuthenticationInterfaceRepository>(AppHealthIAuthenticationInterfaceRepository);
        mapper = new AppHealthAuthenticationInterfaceMapper();
    });

    describe('main', () =>
    {
        test('AppHealthGetAuthenticationInterfacesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an authenticationInterfaces founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new AppHealthGetAuthenticationInterfacesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});