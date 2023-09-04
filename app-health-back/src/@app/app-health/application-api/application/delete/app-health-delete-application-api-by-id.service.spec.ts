/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationApiData } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.data';
import { AppHealthDeleteApplicationApiByIdService } from './app-health-delete-application-api-by-id.service';
import { AppHealthApplicationApiId } from '../../domain/value-objects';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthMockApplicationApiRepository } from '../../infrastructure/mock/app-health-mock-application-api.repository';

describe('AppHealthDeleteApplicationApiByIdService', () =>
{
    let service: AppHealthDeleteApplicationApiByIdService;
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
                AppHealthDeleteApplicationApiByIdService,
                AppHealthMockApplicationApiRepository,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteApplicationApiByIdService);
        repository = module.get(AppHealthIApplicationApiRepository);
        mockRepository = module.get(AppHealthMockApplicationApiRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationApiByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete applicationApi and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthApplicationApiId(appHealthMockApplicationApiData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
