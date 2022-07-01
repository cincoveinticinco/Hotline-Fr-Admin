import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


import * as _ from 'lodash';

@Injectable({
	providedIn: 'root'
})
export class AdminService {

	private languages: any[] = [];
	public service_url: string = environment.apiUrl;
	public httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	constructor(
		private http: HttpClient,
	) { }

	filterElementsInListSplited(list: any[], list_id: any, elements: any, elements_id: any) {
		if (elements && !Array.isArray(elements)) {
			elements = [elements];
		}
		if (!elements || !elements.length) return list;

		let returnData = list.filter((item: any) => {
			if (!item[list_id]) return false;
			let listSplitted = `${item[list_id]}`.split(',');
			for (const listItem of listSplitted) {
				for (const elm of elements) {
					if (listItem == elm[elements_id]) return true;
				}
			}
			return false;
		});

		return this.filterMultipleSelectConfigSplit(returnData, list_id, elements, elements_id, ',');
	}

	filterMultipleSelectConfigSplit(list: any[], list_id: any, elements: any[], elements_id: any, splitCharacter = ',') {
		if (!list || !list.length) return [];
		let markAsAnd = elements[0].markAsAnd;
		let onlySelected = elements[0].onlySelected;

		if (!onlySelected && !markAsAnd) return list;
		let elementIds = elements.map(e => '' + e[elements_id]);
		list = list.filter(item => {
			if (!item[list_id]) return false;
			let splitList = `${item[list_id]}`.split(splitCharacter);
			if (onlySelected) return _.xor(elementIds, splitList).length === 0;
			if (markAsAnd) return elementIds.every(v => splitList.includes(v));
			return false;
		});
		return list;
	}

	searchByMultipleValuesExtended(list: any[], properties: any[], textToSearch: string): any[] {
		let returnList = [];
		if (textToSearch) {
			returnList = list.filter(element => {
				let aev = this.normalizeString(textToSearch.toLowerCase());
				let retItem = false;
				for (let item of properties) {
					if (typeof item === 'string') {
						let text = eval("element." + item);
						if (text) {
							text = text.toString()
							let a = this.normalizeString(text.toLowerCase());
							if (a.indexOf(aev) > -1) {
								retItem = true;
							}
						}
					} else {
						// Object {'children' and 'property'}
						if (element[item.children]) {
							for (const el of element[item.children]) {
								let text = el[item.property];
								if (text) {
									text = text.toString()
									let a = this.normalizeString(text.toLowerCase());
									if (a.indexOf(aev) > -1) {
										retItem = true;
									}
								}
							}
						}
					}

				}
				return retItem;
			});

		} else {
			returnList = list
		}
		return returnList;
	}

	normalizeString(text: any): string {
		let st = `${text}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		return st ? st.toLowerCase() : '';
	}

	getLanguages() {
		return this.languages;
	}

	getListReports() {
		return this.http.get(this.service_url + 'admin/listReports');
	}

	getReportDetail(reportId: number) {
		return this.http.get(this.service_url + 'admin/getReportDetail', {
			params: new HttpParams()
				.set('report_id', reportId)
		});
	}

	createReply(requestParams: { reportId: number, replyTxt: string | null, toClose: boolean }) {
		let params = {
			'report_id': requestParams.reportId,
			'reply_txt': requestParams.replyTxt,
			'to_close': requestParams.toClose,
		};
		return this.http.post(this.service_url + 'admin/addReportReply', params, this.httpOptions).pipe(
			map((response: any) => response))
	}

	createResponseReply(requestParams: { replyId: number, replyTxt: string | null}) {
		let params = {
			'reply_id': requestParams.replyId,
			'reply_txt': requestParams.replyTxt,
		};
		return this.http.post(this.service_url + 'admin/addReportReplyResponse', params, this.httpOptions).pipe(
			map((response: any) => response))
	}

	getListProjects() {
		return this.http.get(this.service_url + 'admin/getProjects');
	}

	addProject(params: any) {
		let queryParams = {
			'p_name': params.p_name,
			'p_season': params.p_season,
			'alias': params.aliases,
			'users': params.correos,
			'center_id': params.center_id,
			'location_name': params.location_name,
			'p_abbreviation': params.p_abbreviation
		}
		return this.http.post(this.service_url + 'admin/newProject', queryParams, this.httpOptions)
			.pipe(
				map((response: any) => {
					return response;
				})
			)
	}
}
