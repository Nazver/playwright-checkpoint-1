export class CatalogPage {
  constructor(page) {
    this.page = page;
  }

  async search(query) {
    await this.page.getByPlaceholder('Search').fill(query);
  }

  async selectBrand(brand) {
    await this.page.getByRole('checkbox', { name: brand, exact: true }).check();
  }

  async openProduct(name) {
    await this.page.getByRole('heading', { name, exact: true }).click();
  }

  async nextPage() {
    await this.page.getByRole('link', { name: 'Next' }).first().click();
  }
}
