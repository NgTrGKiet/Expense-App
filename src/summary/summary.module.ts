import { Module } from '@nestjs/common';
import { SumaryController } from './sumary.controller';
import { SumaryService } from './sumary.service';
import { ReportService } from 'src/report/report.service';
import { ReportModule } from 'src/report/report.module';

@Module({
  imports: [ReportModule],
  controllers: [SumaryController],
  providers: [SumaryService]
})
export class SummaryModule {

}
