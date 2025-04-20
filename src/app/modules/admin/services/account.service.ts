import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyAccount } from '../models/company-account.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/company-accounts`;

  constructor(private http: HttpClient) { }

  getAccountsByStatus(status: string): Observable<CompanyAccount[]> {
    return this.http.get<CompanyAccount[]>(`${this.apiUrl}?status=${status}`);
  }

  getAccountById(id: number): Observable<CompanyAccount> {
    return this.http.get<CompanyAccount>(`${this.apiUrl}/${id}`);
  }

  approveAccount(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectAccount(id: number, reason: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/reject`, { rejectionReason: reason });
  }

  markAccountAsProcessing(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/processing`, {});
  }
} 