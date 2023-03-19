import { AxiosResponse } from "axios";
import GenericPagingDto from "../GenericDto/GenericPagingDto";
import HttpService from "../HttpService";
import CourseFilterParamsDto from "./dto/CourseFilterParamsDto";
import GetCourseDto from "./dto/GetCourseDto";

export default class CourseService extends HttpService {

  getCourses(filterParams: CourseFilterParamsDto, currentPageNumber: number = 1, pageSize: number = 5): Promise<GenericPagingDto<GetCourseDto>> {
    let query: string = '';

    if (filterParams?.courseName) query += `courseName=${encodeURI(filterParams.courseName)}&`;
    if (filterParams?.semesterLimitQtdeExact) query += `semesterLimitQtdeExact=${filterParams.semesterLimitQtdeExact}&`;
    if (filterParams?.semesterLimitQtdeDe) query += `semesterLimitQtdeDe=${filterParams.semesterLimitQtdeDe}&`;
    if (filterParams?.semesterLimitQtdeAte) query += `semesterLimitQtdeAte=${filterParams.semesterLimitQtdeAte}&`;
    if (filterParams?.termsInput) query += `termsInput=${encodeURI(filterParams.termsInput)}&`;
    if (filterParams?.fieldOrderLabel) {
        const split = filterParams?.fieldOrderLabel.split('--');
        const _value = split[0].trim();
        const _orderBy = split[1].trim();
  
        switch (_orderBy) {
          case 'asc':
            query += `fieldOrderLabel=${_value}&isDesc=${false}&`
            break;
          case 'desc':
            query += `fieldOrderLabel=${_value}&isDesc=${true}&`
            break;
          default: break;
        }   
    }

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

  getCourseById(id: number): Promise<GetCourseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Course/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  createCourse(course: GetCourseDto): Promise<GetCourseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Course`, course)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  updateCourse(id: number, course: GetCourseDto): Promise<GetCourseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/Course/${id}`, course)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  deleteCourse(id: number): Promise<GetCourseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/Course/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }
}