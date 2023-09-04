import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthPaginateAuthorizationInterfacesService } from './app-health-paginate-authorization-interfaces.service';
import { AppHealthIAuthorizationInterfaceRepository } from '../../domain/app-health-authorization-interface.repository';
import { AppHealthMockAuthorizationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authorization-interface.repository';

describe('AppHealthPaginateAuthorizationInterfacesService', () =>
{
    let service: AppHealthPaginateAuthorizationInterfacesService;
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
                AppHealthPaginateAuthorizationInterfacesService,
                AppHealthMockAuthorizationInterfaceRepository,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthPaginateAuthorizationInterfacesService);
        repository = module.get(AppHealthIAuthorizationInterfaceRepository);
        mockRepository = module.get(AppHealthMockAuthorizationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateAuthorizationInterfacesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate authorizationInterfaces', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});
