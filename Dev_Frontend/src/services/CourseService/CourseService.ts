import { AxiosResponse } from "axios";
import GenericPagingDto from "../GenericDto/GenericPagingDto";
import HttpService from "../HttpService";
import CourseFilterParamsDto from "./dto/CourseFilterParamsDto";
import GetCourseDto from "./dto/GetCourseDto";

export default class CourseService extends HttpService {

  getCourses(filterParams: CourseFilterParamsDto, currentPageNumber: number = 1, pageSize: number = 5): Promise<GenericPagingDto<GetCourseDto>> {
    let query: string = '';

    if (filterParams?.courseName) query += `courseName=${filterParams.courseName}&`;
    if (filterParams?.semesterLimitQtdeType) query += `semesterLimitQtdeType=${filterParams.semesterLimitQtdeType}&`;
    if (filterParams?.semesterLimitQtdeDe) query += `semesterLimitQtdeDe=${filterParams.semesterLimitQtdeDe}&`;
    if (filterParams?.semesterLimitQtdeAte) query += `semesterLimitQtdeAte=${filterParams.semesterLimitQtdeAte}&`;
    if (filterParams?.fieldOrderLabel) query += `fieldOrderLabel=${filterParams.fieldOrderLabel}&`;
    if (filterParams?.isDesc || filterParams?.isDesc == false) query += `isDesc=${filterParams.isDesc}&`;

    query += `currentPageNumber=${currentPageNumber - 1}&`;
    query += `pageSize=${pageSize}`;

    return new Promise((resolve, reject) => {
      this.getApi().get(`/Course?${query}`)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }
}