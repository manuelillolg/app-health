/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockLanguageData } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.data';
import { AppHealthDeleteLanguageByIdService } from './app-health-delete-language-by-id.service';
import { AppHealthLanguageId } from '../../domain/value-objects';
import { AppHealthILanguageRepository } from '../../domain/app-health-language.repository';
import { AppHealthMockLanguageRepository } from '../../infrastructure/mock/app-health-mock-language.repository';

describe('AppHealthDeleteLanguageByIdService', () =>
{
    let service: AppHealthDeleteLanguageByIdService;
    let repository: AppHealthILanguageRepository;
    let mockRepository: AppHealthMockLanguageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteLanguageByIdService,
                AppHealthMockLanguageRepository,
                {
                    provide : AppHealthILanguageRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteLanguageByIdService);
        repository = module.get(AppHealthILanguageRepository);
        mockRepository = module.get(AppHealthMockLanguageRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteLanguageByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete language and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthLanguageId(appHealthMockLanguageData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
