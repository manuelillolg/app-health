import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLAuthorizationInterfacesService } from './app-health-raw-sql-authorization-interfaces.service';
import { AppHealthIAuthorizationInterfaceRepository } from '../../domain/app-health-authorization-interface.repository';
import { AppHealthMockAuthorizationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authorization-interface.repository';

describe('AppHealthRawSQLAuthorizationInterfacesService ', () =>
{
    let service: AppHealthRawSQLAuthorizationInterfacesService ;
    let repository: AppHealthIAuthorizationInterfaceRepository;
    let mockRepository: AppHealthMockAuthorizationInterfaceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthRawSQLAuthorizationInterfacesService ,
                AppHealthMockAuthorizationInterfaceRepository,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLAuthorizationInterfacesService );
        repository      = module.get(AppHealthIAuthorizationInterfaceRepository);
        mockRepository  = module.get(AppHealthMockAuthorizationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('RawSQLAuthorizationInterfacesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get authorizationInterfaces', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
