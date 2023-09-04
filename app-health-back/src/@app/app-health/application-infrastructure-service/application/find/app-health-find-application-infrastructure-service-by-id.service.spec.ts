import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.data';
import { AppHealthFindApplicationInfrastructureServiceByIdService } from './app-health-find-application-infrastructure-service-by-id.service';
import { AppHealthApplicationInfrastructureServiceId } from '../../domain/value-objects';
import { AppHealthIApplicationInfrastructureServiceRepository } from '../../domain/app-health-application-infrastructure-service.repository';
import { AppHealthMockApplicationInfrastructureServiceRepository } from '../../infrastructure/mock/app-health-mock-application-infrastructure-service.repository';

describe('AppHealthFindApplicationInfrastructureServiceByIdService', () =>
{
    let service: AppHealthFindApplicationInfrastructureServiceByIdService;
    let repository: AppHealthIApplicationInfrastructureServiceRepository;
    let mockRepository: AppHealthMockApplicationInfrastructureServiceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindApplicationInfrastructureServiceByIdService,
                AppHealthMockApplicationInfrastructureServiceRepository,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationInfrastructureServiceByIdService);
        repository = module.get(AppHealthIApplicationInfrastructureServiceRepository);
        mockRepository = module.get(AppHealthMockApplicationInfrastructureServiceRepository);
    });

    describe('main', () =>
    {
        test('FindApplicationInfrastructureServiceByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationInfrastructureService by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthApplicationInfrastructureServiceId(appHealthMockApplicationInfrastructureServiceData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
