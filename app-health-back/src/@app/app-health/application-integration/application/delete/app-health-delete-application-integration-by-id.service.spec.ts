/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration/infrastructure/mock/app-health-mock-application-integration.data';
import { AppHealthDeleteApplicationIntegrationByIdService } from './app-health-delete-application-integration-by-id.service';
import { AppHealthApplicationIntegrationId } from '../../domain/value-objects';
import { AppHealthIApplicationIntegrationRepository } from '../../domain/app-health-application-integration.repository';
import { AppHealthMockApplicationIntegrationRepository } from '../../infrastructure/mock/app-health-mock-application-integration.repository';

describe('AppHealthDeleteApplicationIntegrationByIdService', () =>
{
    let service: AppHealthDeleteApplicationIntegrationByIdService;
    let repository: AppHealthIApplicationIntegrationRepository;
    let mockRepository: AppHealthMockApplicationIntegrationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteApplicationIntegrationByIdService,
                AppHealthMockApplicationIntegrationRepository,
                {
                    provide : AppHealthIApplicationIntegrationRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteApplicationIntegrationByIdService);
        repository = module.get(AppHealthIApplicationIntegrationRepository);
        mockRepository = module.get(AppHealthMockApplicationIntegrationRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationIntegrationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete applicationIntegration and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthApplicationIntegrationId(appHealthMockApplicationIntegrationData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
