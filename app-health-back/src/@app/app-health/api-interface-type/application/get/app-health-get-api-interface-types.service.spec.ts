import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetApiInterfaceTypesService } from './app-health-get-api-interface-types.service';
import { AppHealthIApiInterfaceTypeRepository } from '../../domain/app-health-api-interface-type.repository';
import { AppHealthMockApiInterfaceTypeRepository } from '../../infrastructure/mock/app-health-mock-api-interface-type.repository';

describe('AppHealthGetApiInterfaceTypesService', () =>
{
    let service: AppHealthGetApiInterfaceTypesService;
    let repository: AppHealthIApiInterfaceTypeRepository;
    let mockRepository: AppHealthMockApiInterfaceTypeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthGetApiInterfaceTypesService,
                AppHealthMockApiInterfaceTypeRepository,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetApiInterfaceTypesService);
        repository = module.get(AppHealthIApiInterfaceTypeRepository);
        mockRepository = module.get(AppHealthMockApiInterfaceTypeRepository);
    });

    describe('main', () =>
    {
        test('GetApiInterfaceTypesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get apiInterfaceTypes', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
