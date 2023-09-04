import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLApplicationViewsService } from './app-health-raw-sql-application-views.service';
import { AppHealthIApplicationViewRepository } from '../../domain/app-health-application-view.repository';
import { AppHealthMockApplicationViewRepository } from '../../infrastructure/mock/app-health-mock-application-view.repository';

describe('AppHealthRawSQLApplicationViewsService ', () =>
{
    let service: AppHealthRawSQLApplicationViewsService ;
    let repository: AppHealthIApplicationViewRepository;
    let mockRepository: AppHealthMockApplicationViewRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthRawSQLApplicationViewsService ,
                AppHealthMockApplicationViewRepository,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLApplicationViewsService );
        repository      = module.get(AppHealthIApplicationViewRepository);
        mockRepository  = module.get(AppHealthMockApplicationViewRepository);
    });

    describe('main', () =>
    {
        test('RawSQLApplicationViewsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationViews', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
