import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindApiInterfaceTypeService } from './app-health-find-api-interface-type.service';
import { AppHealthIApiInterfaceTypeRepository } from '../../domain/app-health-api-interface-type.repository';
import { AppHealthMockApiInterfaceTypeRepository } from '../../infrastructure/mock/app-health-mock-api-interface-type.repository';

describe('AppHealthFindApiInterfaceTypeService', () =>
{
    let service: AppHealthFindApiInterfaceTypeService;
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
                AppHealthFindApiInterfaceTypeService,
                AppHealthMockApiInterfaceTypeRepository,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApiInterfaceTypeService);
        repository = module.get(AppHealthIApiInterfaceTypeRepository);
        mockRepository = module.get(AppHealthMockApiInterfaceTypeRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindApiInterfaceTypeService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find apiInterfaceType', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
