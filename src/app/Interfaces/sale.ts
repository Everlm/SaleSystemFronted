import { SaleDetail } from "./sale-detail";

export interface Sale {
  saleId?: number,
  documentNumber?: string,
  paymentType: string,
  creationDate?: string,
  total: string,
  saleDetail: SaleDetail[]
}
