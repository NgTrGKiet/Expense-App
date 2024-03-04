import { Controller, Get, Param, Post, Put, Delete, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from '@nestjs/common';
import { ReportType, data } from '../data';
import { ReportService } from './report.service';
import { ReportResponseDto, createReportDto, updateReportDto } from 'src/dtos/report.dto';

@Controller('report/:type')
export class ReportController {
    constructor(
        private readonly reportService: ReportService
    ) { }

    @Get()
    getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string)
        : ReportResponseDto[] {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.getAllReport(reportType)
    }

    @Get(':id')
    getReportById(@Param('id', ParseUUIDPipe) id: string,
        @Param('type', new ParseEnumPipe(ReportType)) type: string)
        : ReportResponseDto {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.getReportById(reportType, id)
    }

    @Post()
    createReport(
        @Body() {
            amount: number,
            source: string
        }: createReportDto,
        @Param('type', new ParseEnumPipe(ReportType)) type: string
    ): ReportResponseDto {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.createReport({
            amount: number,
            source: string
        }, reportType)
    }

    @Put(':id')
    updateReport(
        @Body() {
            amount: number,
            source: string
        }: updateReportDto,
        @Param('type', new ParseEnumPipe(ReportType)) type: string,
        @Param('id', ParseUUIDPipe) id: string
    ): ReportResponseDto {
        const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
        return this.reportService.updateReport({
            amount: number,
            source: string
        }, reportType, id)
    }

    @HttpCode(204)
    @Delete(':id')
    deleteReport(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        return this.reportService.deleteReport(id)
    }
}
