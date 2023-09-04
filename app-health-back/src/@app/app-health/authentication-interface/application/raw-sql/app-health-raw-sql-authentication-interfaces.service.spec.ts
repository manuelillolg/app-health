import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLAuthenticationInterfacesService } from './app-health-raw-sql-authentication-interfaces.service';
import { AppHealthIAuthenticationInterfaceRepository } from '../../domain/app-health-authentication-interface.repository';
import { AppHealthMockAuthenticationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authentication-interface.repository';

describe('AppHealthRawSQLAuthenticationInterfacesService ', () =>
{
    let service: AppHealthRawSQLAuthenticationInterfacesService ;
    let repository: AppHealthIAuthenticationInterfaceRepository;
    let mockRepository: AppHealthMockAuthenticationInterfaceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthRawSQLAuthenticationInterfacesService ,
                AppHealthMockAuthenticationInterfaceRepository,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLAuthenticationInterfacesService );
        repository      = module.get(AppHealthIAuthenticationInterfaceRepository);
        mockRepository  = module.get(AppHealthMockAuthenticationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('RawSQLAuthenticationInterfacesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get authenticationInterfaces', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
