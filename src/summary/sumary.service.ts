import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SumaryService {
    constructor(private readonly reportService: ReportService) { }

    calculateSummary() {
        const totalExpense = this.reportService
            .getAllReport(ReportType.EXPENSE)
            .reduce((acc, cur) => acc + cur.amount, 0)
        const totalInCome = this.reportService
            .getAllReport(ReportType.INCOME)
            .reduce((acc, cur) => acc + cur.amount, 0)

        return {
            totalExpense,
            totalInCome,
            netIncome: totalInCome - totalExpense
        }
    }
}
