import { Injectable } from '@nestjs/common';
import { ReportType, data } from '../data';
import { v4 as uuid } from "uuid"

interface Report {
    amount: number,
    source: string
}

interface UpdatedReport {
    amount?: number,
    source?: string
}

@Injectable()
export class ReportService {
    getAllReport(type: ReportType) {
        return data.report.filter(ele => ele.type === type);
    }

    getReportById(type: ReportType, id: string) {
        const report = data.report
            .filter(ele => ele.type === type)
            .find(ele => ele.id === id)

        if (!report) return

        return report
    }

    createReport({
        amount,
        source
    }: Report,
        type: ReportType
    ) {
        const newReport = {
            id: uuid(),
            source,
            amount,
            created_at: new Date(),
            updated_at: new Date(),
            type
        }
        data.report.push(newReport)
        return newReport;
    }

    updateReport(
        body: UpdatedReport,
        type: ReportType,
        id: string
    ) {
        const report = data.report
            .filter(ele => ele.type === type)
            .find(ele => ele.id === id)

        if (!report) return

        const reportIndex = data.report.findIndex(
            ele => ele.id === report.id
        )

        data.report[reportIndex] = {
            ...data.report[reportIndex],
            ...body,
            updated_at: new Date()
        }
        return data.report[reportIndex]
    }

    deleteReport(id: string) {
        const reportIndex = data.report.findIndex(
            ele => ele.id === id
        )

        if (reportIndex === -1) return

        data.report.splice(reportIndex, 1)
        return "Success";
    }
}
