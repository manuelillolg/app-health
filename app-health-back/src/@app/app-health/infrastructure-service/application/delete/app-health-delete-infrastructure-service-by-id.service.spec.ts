/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service/infrastructure/mock/app-health-mock-infrastructure-service.data';
import { AppHealthDeleteInfrastructureServiceByIdService } from './app-health-delete-infrastructure-service-by-id.service';
import { AppHealthInfrastructureServiceId } from '../../domain/value-objects';
import { AppHealthIInfrastructureServiceRepository } from '../../domain/app-health-infrastructure-service.repository';
import { AppHealthMockInfrastructureServiceRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-service.repository';

describe('AppHealthDeleteInfrastructureServiceByIdService', () =>
{
    let service: AppHealthDeleteInfrastructureServiceByIdService;
    let repository: AppHealthIInfrastructureServiceRepository;
    let mockRepository: AppHealthMockInfrastructureServiceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteInfrastructureServiceByIdService,
                AppHealthMockInfrastructureServiceRepository,
                {
                    provide : AppHealthIInfrastructureServiceRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteInfrastructureServiceByIdService);
        repository = module.get(AppHealthIInfrastructureServiceRepository);
        mockRepository = module.get(AppHealthMockInfrastructureServiceRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureServiceByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete infrastructureService and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthInfrastructureServiceId(appHealthMockInfrastructureServiceData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
