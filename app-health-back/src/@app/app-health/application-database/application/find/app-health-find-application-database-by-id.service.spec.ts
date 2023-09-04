import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.data';
import { AppHealthFindApplicationDatabaseByIdService } from './app-health-find-application-database-by-id.service';
import { AppHealthApplicationDatabaseId } from '../../domain/value-objects';
import { AppHealthIApplicationDatabaseRepository } from '../../domain/app-health-application-database.repository';
import { AppHealthMockApplicationDatabaseRepository } from '../../infrastructure/mock/app-health-mock-application-database.repository';

describe('AppHealthFindApplicationDatabaseByIdService', () =>
{
    let service: AppHealthFindApplicationDatabaseByIdService;
    let repository: AppHealthIApplicationDatabaseRepository;
    let mockRepository: AppHealthMockApplicationDatabaseRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindApplicationDatabaseByIdService,
                AppHealthMockApplicationDatabaseRepository,
                {
                    provide : AppHealthIApplicationDatabaseRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationDatabaseByIdService);
        repository = module.get(AppHealthIApplicationDatabaseRepository);
        mockRepository = module.get(AppHealthMockApplicationDatabaseRepository);
    });

    describe('main', () =>
    {
        test('FindApplicationDatabaseByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationDatabase by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthApplicationDatabaseId(appHealthMockApplicationDatabaseData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
