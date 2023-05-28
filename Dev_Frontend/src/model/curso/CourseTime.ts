import { TimeRange } from "../../_commons/FinalForm/FinalInputTimeRange";
import { getNullDateFromAPI } from "../../misc/utils/utils";
import CourseTimeDto from "../../services/CourseService/dto/CourseTimeDto";

export default class CourseTime extends CourseTimeDto {
    constructor(
        public i_Cod_Horario: number = 0,
        public i_Cod_Turma: number = 0,
        public i_Dia_Da_Semana: number | null = null,
        public d_Hora_Inicio: Date | null = null,
        public d_Hora_Fim: Date | null = null,
        public b_E_Hora_Fim_No_Dia_Seguinte: boolean = false,
        public rowKey: number = +window.crypto.getRandomValues(new Uint32Array(1)),
    ) {
        super(i_Cod_Horario, i_Cod_Turma, i_Dia_Da_Semana, d_Hora_Inicio, d_Hora_Fim, b_E_Hora_Fim_No_Dia_Seguinte);
        this.rowKey = rowKey;
        if (this.d_Hora_Inicio != null && this.d_Hora_Fim != null) {
            const fromRawData = new TimeRange();
            fromRawData.startTime = this.d_Hora_Inicio;
            fromRawData.endTime = this.d_Hora_Fim;
            this.timeRange = fromRawData;
        }
    }

    public timeRange: TimeRange = new TimeRange();

    public static FromDto(dto: CourseTimeDto): CourseTime {
        const parsed = new CourseTime(
            dto.i_Cod_Horario,
            dto.i_Cod_Turma,
            dto.i_Dia_Da_Semana,
            getNullDateFromAPI(dto.d_Hora_Inicio),
            getNullDateFromAPI(dto.d_Hora_Fim),
            dto.b_E_Hora_Fim_No_Dia_Seguinte
        );
        return parsed;
    }

    public AsDto(): CourseTimeDto {
        const parsed = new CourseTimeDto(
            this.i_Cod_Horario,
            this.i_Cod_Turma,
            this.i_Dia_Da_Semana ?? 0,
            this.d_Hora_Inicio,
            this.d_Hora_Fim,
            this.b_E_Hora_Fim_No_Dia_Seguinte
        );
        return parsed;
    }

  }