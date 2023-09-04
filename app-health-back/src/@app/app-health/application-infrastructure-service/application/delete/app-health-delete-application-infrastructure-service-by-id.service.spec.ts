/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service/infrastructure/mock/app-health-mock-application-infrastructure-service.data';
import { AppHealthDeleteApplicationInfrastructureServiceByIdService } from './app-health-delete-application-infrastructure-service-by-id.service';
import { AppHealthApplicationInfrastructureServiceId } from '../../domain/value-objects';
import { AppHealthIApplicationInfrastructureServiceRepository } from '../../domain/app-health-application-infrastructure-service.repository';
import { AppHealthMockApplicationInfrastructureServiceRepository } from '../../infrastructure/mock/app-health-mock-application-infrastructure-service.repository';

describe('AppHealthDeleteApplicationInfrastructureServiceByIdService', () =>
{
    let service: AppHealthDeleteApplicationInfrastructureServiceByIdService;
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
                AppHealthDeleteApplicationInfrastructureServiceByIdService,
                AppHealthMockApplicationInfrastructureServiceRepository,
                {
                    provide : AppHealthIApplicationInfrastructureServiceRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteApplicationInfrastructureServiceByIdService);
        repository = module.get(AppHealthIApplicationInfrastructureServiceRepository);
        mockRepository = module.get(AppHealthMockApplicationInfrastructureServiceRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationInfrastructureServiceByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete applicationInfrastructureService and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthApplicationInfrastructureServiceId(appHealthMockApplicationInfrastructureServiceData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
