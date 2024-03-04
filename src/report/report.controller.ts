import { Controller, Get, Param, Post, Put, Delete, Body, HttpCode } from '@nestjs/common';
import { ReportType, data } from '../data';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
    constructor(
        private readonly reportService: ReportService
    ) { }

    @Get()
    getAllReports(@Param('type') type: string) {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.getAllReport(reportType)
    }

    @Get(':id')
    getReportById(@Param('id') id: string, @Param('type') type: string) {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.getReportById(reportType, id)
    }

    @Post()
    createReport(
        @Body() body: {
            amount: number,
            source: string
        },
        @Param('type') type: string
    ) {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.createReport(body, reportType)
    }

    @Put(':id')
    updateReport(
        @Body() body: {
            amount: number,
            source: string
        },
        @Param('type') type: string,
        @Param('id') id: string
    ) {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.updateReport(body, reportType, id)
    }

    @HttpCode(204)
    @Delete(':id')
    deleteReport(
        @Param('id') id: string
    ) {
        return this.reportService.deleteReport(id)
    }
}
