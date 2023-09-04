import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthPaginateApiInterfaceTypesService } from './app-health-paginate-api-interface-types.service';
import { AppHealthIApiInterfaceTypeRepository } from '../../domain/app-health-api-interface-type.repository';
import { AppHealthMockApiInterfaceTypeRepository } from '../../infrastructure/mock/app-health-mock-api-interface-type.repository';

describe('AppHealthPaginateApiInterfaceTypesService', () =>
{
    let service: AppHealthPaginateApiInterfaceTypesService;
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
                AppHealthPaginateApiInterfaceTypesService,
                AppHealthMockApiInterfaceTypeRepository,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthPaginateApiInterfaceTypesService);
        repository = module.get(AppHealthIApiInterfaceTypeRepository);
        mockRepository = module.get(AppHealthMockApiInterfaceTypeRepository);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApiInterfaceTypesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate apiInterfaceTypes', async () =>
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
