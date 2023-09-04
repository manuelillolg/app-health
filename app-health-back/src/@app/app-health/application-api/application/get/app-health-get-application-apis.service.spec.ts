import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthGetApplicationApisService } from './app-health-get-application-apis.service';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthMockApplicationApiRepository } from '../../infrastructure/mock/app-health-mock-application-api.repository';

describe('AppHealthGetApplicationApisService', () =>
{
    let service: AppHealthGetApplicationApisService;
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
                AppHealthGetApplicationApisService,
                AppHealthMockApplicationApiRepository,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthGetApplicationApisService);
        repository = module.get(AppHealthIApplicationApiRepository);
        mockRepository = module.get(AppHealthMockApplicationApiRepository);
    });

    describe('main', () =>
    {
        test('GetApplicationApisService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationApis', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
