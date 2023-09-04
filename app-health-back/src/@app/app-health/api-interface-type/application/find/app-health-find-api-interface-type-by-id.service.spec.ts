import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type/infrastructure/mock/app-health-mock-api-interface-type.data';
import { AppHealthFindApiInterfaceTypeByIdService } from './app-health-find-api-interface-type-by-id.service';
import { AppHealthApiInterfaceTypeId } from '../../domain/value-objects';
import { AppHealthIApiInterfaceTypeRepository } from '../../domain/app-health-api-interface-type.repository';
import { AppHealthMockApiInterfaceTypeRepository } from '../../infrastructure/mock/app-health-mock-api-interface-type.repository';

describe('AppHealthFindApiInterfaceTypeByIdService', () =>
{
    let service: AppHealthFindApiInterfaceTypeByIdService;
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
                AppHealthFindApiInterfaceTypeByIdService,
                AppHealthMockApiInterfaceTypeRepository,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApiInterfaceTypeByIdService);
        repository = module.get(AppHealthIApiInterfaceTypeRepository);
        mockRepository = module.get(AppHealthMockApiInterfaceTypeRepository);
    });

    describe('main', () =>
    {
        test('FindApiInterfaceTypeByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find apiInterfaceType by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthApiInterfaceTypeId(appHealthMockApiInterfaceTypeData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
