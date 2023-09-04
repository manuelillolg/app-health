import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthPaginateDatabasesService } from './app-health-paginate-databases.service';
import { AppHealthIDatabaseRepository } from '../../domain/app-health-database.repository';
import { AppHealthMockDatabaseRepository } from '../../infrastructure/mock/app-health-mock-database.repository';

describe('AppHealthPaginateDatabasesService', () =>
{
    let service: AppHealthPaginateDatabasesService;
    let repository: AppHealthIDatabaseRepository;
    let mockRepository: AppHealthMockDatabaseRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthPaginateDatabasesService,
                AppHealthMockDatabaseRepository,
                {
                    provide : AppHealthIDatabaseRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthPaginateDatabasesService);
        repository = module.get(AppHealthIDatabaseRepository);
        mockRepository = module.get(AppHealthMockDatabaseRepository);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateDatabasesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate databases', async () =>
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
