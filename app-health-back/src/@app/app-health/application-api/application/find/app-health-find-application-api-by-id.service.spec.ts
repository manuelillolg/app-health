import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationApiData } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.data';
import { AppHealthFindApplicationApiByIdService } from './app-health-find-application-api-by-id.service';
import { AppHealthApplicationApiId } from '../../domain/value-objects';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthMockApplicationApiRepository } from '../../infrastructure/mock/app-health-mock-application-api.repository';

describe('AppHealthFindApplicationApiByIdService', () =>
{
    let service: AppHealthFindApplicationApiByIdService;
    let repository: AppHealthIApplicationApiRepository;
    let mockRepository: AppHealthMockApplicationApiRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindApplicationApiByIdService,
                AppHealthMockApplicationApiRepository,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationApiByIdService);
        repository = module.get(AppHealthIApplicationApiRepository);
        mockRepository = module.get(AppHealthMockApplicationApiRepository);
    });

    describe('main', () =>
    {
        test('FindApplicationApiByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationApi by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthApplicationApiId(appHealthMockApplicationApiData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
