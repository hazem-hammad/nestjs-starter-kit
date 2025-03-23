export class PaginationDetailsDto {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;

  constructor(
    total: number,
    count: number,
    perPage: number,
    currentPage: number,
  ) {
    this.total = total;
    this.count = count;
    this.per_page = perPage;
    this.current_page = currentPage;
    this.total_pages = Math.ceil(total / perPage);
  }
}
