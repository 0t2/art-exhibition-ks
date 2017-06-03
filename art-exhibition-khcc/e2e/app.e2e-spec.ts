import { ArtExhibitionKhccPage } from './app.po';

describe('art-exhibition-khcc App', () => {
  let page: ArtExhibitionKhccPage;

  beforeEach(() => {
    page = new ArtExhibitionKhccPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
