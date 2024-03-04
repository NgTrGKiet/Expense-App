import { Controller, Get } from '@nestjs/common';
import { SumaryService } from './sumary.service';

@Controller('sumary')
export class SumaryController {
    constructor(private readonly summaryService: SumaryService) { }

    @Get()
    getSummary() {
        return this.summaryService.calculateSummary();
    }

}
