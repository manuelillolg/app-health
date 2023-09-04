/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationData } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.data';
import { AppHealthDeleteApplicationByIdService } from './app-health-delete-application-by-id.service';
import { AppHealthApplicationId } from '../../domain/value-objects';
import { AppHealthIApplicationRepository } from '../../domain/app-health-application.repository';
import { AppHealthMockApplicationRepository } from '../../infrastructure/mock/app-health-mock-application.repository';

describe('AppHealthDeleteApplicationByIdService', () =>
{
    let service: AppHealthDeleteApplicationByIdService;
    let repository: AppHealthIApplicationRepository;
    let mockRepository: AppHealthMockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteApplicationByIdService,
                AppHealthMockApplicationRepository,
                {
                    provide : AppHealthIApplicationRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteApplicationByIdService);
        repository = module.get(AppHealthIApplicationRepository);
        mockRepository = module.get(AppHealthMockApplicationRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete application and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthApplicationId(appHealthMockApplicationData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
